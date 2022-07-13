package com.example.watchout_frontend_kotlin.model

import com.google.gson.annotations.SerializedName

data class SignupResponse (
    @SerializedName("message") val message: String?,
    @SerializedName("token") val token: String?,
)