package com.dontreact.challenge

import androidx.annotation.StringRes

enum class ChallengeType(@StringRes val textRes: Int) {
    DONT_SMILE(R.string.challenge_dont_smile),
    DONT_BLINK(R.string.challenge_dont_blink),
    DONT_LAUGH(R.string.challenge_dont_laugh)
}
