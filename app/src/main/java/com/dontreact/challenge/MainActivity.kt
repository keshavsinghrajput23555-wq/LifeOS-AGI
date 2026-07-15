package com.dontreact.challenge

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.os.CountDownTimer
import android.view.View
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.camera.core.CameraSelector
import androidx.camera.core.ImageAnalysis
import androidx.camera.core.Preview
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.core.content.ContextCompat
import com.dontreact.challenge.databinding.ActivityMainBinding
import com.google.mlkit.vision.face.Face
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors
import kotlin.random.Random

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var cameraExecutor: ExecutorService
    private lateinit var soundEffects: SoundEffects

    private val challengePool = listOf(
        ChallengeType.DONT_SMILE,
        ChallengeType.DONT_BLINK,
        ChallengeType.DONT_LAUGH
    )

    private var activeChallenge: ChallengeType? = null
    private var gameRunning = false
    private var reacted = false
    private var countDownTimer: CountDownTimer? = null

    private val cameraPermissionLauncher =
        registerForActivityResult(ActivityResultContracts.RequestPermission()) { granted ->
            if (granted) {
                startCamera()
                showGameScreen()
            } else {
                binding.statusText.text = getString(R.string.camera_permission_required)
            }
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        cameraExecutor = Executors.newSingleThreadExecutor()
        soundEffects = SoundEffects()

        binding.startButton.setOnClickListener {
            ensureCameraAndStartGame()
        }

        binding.playAgainButton.setOnClickListener {
            showStartScreen()
        }
    }

    private fun ensureCameraAndStartGame() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
            == PackageManager.PERMISSION_GRANTED
        ) {
            startCamera()
            showGameScreen()
        } else {
            cameraPermissionLauncher.launch(Manifest.permission.CAMERA)
        }
    }

    private fun showStartScreen() {
        gameRunning = false
        countDownTimer?.cancel()
        binding.startLayout.visibility = View.VISIBLE
        binding.gameLayout.visibility = View.GONE
        binding.resultLayout.visibility = View.GONE
        binding.statusText.text = getString(R.string.ready_status)
    }

    private fun showGameScreen() {
        binding.startLayout.visibility = View.GONE
        binding.gameLayout.visibility = View.VISIBLE
        binding.resultLayout.visibility = View.GONE
        startChallengeRound()
    }

    private fun showResult(win: Boolean) {
        gameRunning = false
        countDownTimer?.cancel()

        binding.startLayout.visibility = View.GONE
        binding.gameLayout.visibility = View.GONE
        binding.resultLayout.visibility = View.VISIBLE

        if (win) {
            binding.resultTitle.text = getString(R.string.you_win)
            binding.resultSubtitle.text = getString(R.string.win_subtitle)
            soundEffects.playWin()
        } else {
            binding.resultTitle.text = getString(R.string.you_lose)
            binding.resultSubtitle.text = getString(R.string.lose_subtitle)
            soundEffects.playLose()
        }
    }

    private fun startChallengeRound() {
        reacted = false
        gameRunning = true
        activeChallenge = challengePool.random(Random(System.currentTimeMillis()))
        binding.challengeText.text = activeChallenge?.textRes?.let { getString(it) }
        binding.timerText.text = getString(R.string.timer_seconds, 10)

        countDownTimer?.cancel()
        countDownTimer = object : CountDownTimer(10_000L, 1000L) {
            override fun onTick(millisUntilFinished: Long) {
                val seconds = (millisUntilFinished / 1000L).toInt()
                binding.timerText.text = getString(R.string.timer_seconds, seconds)
            }

            override fun onFinish() {
                binding.timerText.text = getString(R.string.timer_seconds, 0)
                if (!reacted) showResult(win = true)
            }
        }.start()
    }

    private fun startCamera() {
        val cameraProviderFuture = ProcessCameraProvider.getInstance(this)
        cameraProviderFuture.addListener({
            val cameraProvider = cameraProviderFuture.get()

            val preview = Preview.Builder().build().also {
                it.surfaceProvider = binding.previewView.surfaceProvider
            }

            val imageAnalysis = ImageAnalysis.Builder()
                .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
                .build()

            val detector = FaceReactionAnalyzer { face ->
                evaluateReaction(face)
            }

            imageAnalysis.setAnalyzer(cameraExecutor, detector)

            val frontCameraSelector = CameraSelector.Builder()
                .requireLensFacing(CameraSelector.LENS_FACING_FRONT)
                .build()

            try {
                cameraProvider.unbindAll()
                cameraProvider.bindToLifecycle(this, frontCameraSelector, preview, imageAnalysis)
            } catch (exc: Exception) {
                binding.statusText.text = getString(R.string.camera_error, exc.localizedMessage ?: "unknown")
            }
        }, ContextCompat.getMainExecutor(this))
    }

    private fun evaluateReaction(face: Face) {
        if (!gameRunning || reacted || activeChallenge == null) return

        val smileProb = face.smilingProbability ?: -1f
        val leftEyeOpenProb = face.leftEyeOpenProbability ?: -1f
        val rightEyeOpenProb = face.rightEyeOpenProbability ?: -1f

        val blinkDetected = leftEyeOpenProb in 0f..0.4f || rightEyeOpenProb in 0f..0.4f
        val smileDetected = smileProb > 0.55f
        val laughDetected = smileProb > 0.75f

        val triggered = when (activeChallenge) {
            ChallengeType.DONT_SMILE -> smileDetected
            ChallengeType.DONT_BLINK -> blinkDetected
            ChallengeType.DONT_LAUGH -> laughDetected
            null -> false
        }

        if (triggered) {
            reacted = true
            runOnUiThread { showResult(win = false) }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        countDownTimer?.cancel()
        cameraExecutor.shutdown()
        soundEffects.release()
    }
}
