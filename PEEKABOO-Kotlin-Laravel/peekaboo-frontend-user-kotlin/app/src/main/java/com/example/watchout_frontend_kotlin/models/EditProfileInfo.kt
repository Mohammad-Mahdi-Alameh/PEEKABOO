package com.example.watchout_frontend_kotlin.models

import com.google.gson.annotations.SerializedName

data class EditProfileInfo (
    @SerializedName("user_id") val user_id: Int?,
    @SerializedName("firstname") val firstname: String?,
    @SerializedName("lastname") val lastname: String?,
    @SerializedName("phonenumber") val phonenumber: Int?,
    @SerializedName("username") val username: String?,
    @SerializedName("picture") val picture: String?,
    @SerializedName("password") val password: String?,
)