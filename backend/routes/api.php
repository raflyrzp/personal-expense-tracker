<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('expenses', [\App\Http\Controllers\ExpenseController::class, 'index']);
Route::get('expenses/{id}', [\App\Http\Controllers\ExpenseController::class, 'show']);
Route::post('expenses', [\App\Http\Controllers\ExpenseController::class, 'store']);
Route::put('expenses/{id}', [\App\Http\Controllers\ExpenseController::class, 'update']);
Route::delete('expenses/{id}', [\App\Http\Controllers\ExpenseController::class, 'destroy']);
