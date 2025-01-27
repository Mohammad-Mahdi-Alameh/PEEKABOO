package com.example.watchout_frontend_kotlin.models

import com.google.gson.annotations.SerializedName

data class LoginResponse (
    @SerializedName("success") val success: Boolean?,
    @SerializedName("token") val token: String?,
    @SerializedName("message") val message: String?,
    @SerializedName("user_id") val id: Int?,
    @SerializedName("firstname") val firstname: String?,
    @SerializedName("lastname") val lastname: String?,
    @SerializedName("phonenumber") val phonenumber: Int?,
    @SerializedName("balance") val balance: Int?,
    @SerializedName("total_reports") val totalReports: Int?,
    @SerializedName("picture") val picture: String?,
    @SerializedName("total_false_infras") val totalFalseInfras: Int?,
)
