package com.dontreact.challenge

import android.media.AudioManager
import android.media.ToneGenerator
import android.os.Handler
import android.os.Looper

class SoundEffects {
    private val toneGenerator = ToneGenerator(AudioManager.STREAM_MUSIC, 80)
    private val mainHandler = Handler(Looper.getMainLooper())

    fun playWin() {
        playTone(ToneGenerator.TONE_PROP_ACK, 160)
        mainHandler.postDelayed({ playTone(ToneGenerator.TONE_PROP_PROMPT, 180) }, 180L)
    }

    fun playLose() {
        playTone(ToneGenerator.TONE_PROP_NACK, 360)
    }

    private fun playTone(toneType: Int, durationMs: Int) {
        toneGenerator.startTone(toneType, durationMs)
    }

    fun release() {
        mainHandler.removeCallbacksAndMessages(null)
        toneGenerator.release()
    }
}
