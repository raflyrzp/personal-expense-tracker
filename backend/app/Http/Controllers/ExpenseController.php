<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ExpenseController extends Controller
{
    private const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Other'];

    public function index(Request $request)
    {
        $category = $request->query('category');

        $query = Expense::query()->orderByDesc('created_at');

        if ($category && in_array($category, self::CATEGORIES, true)) {
            $query->where('category', $category);
        }

        return response()->json($query->get());
    }

    public function show(string $id)
    {
        $expense = Expense::find($id);
        if (!$expense) {
            return response()->json(['message' => 'Expense not found'], 404);
        }
        return response()->json($expense);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'amount' => ['required', 'numeric', 'gt:0'],
            'description' => ['required', 'string', 'max:255'],
            'category' => ['required', Rule::in(self::CATEGORIES)],
        ], [
            'amount.gt' => 'Amount must be greater than 0.',
            'category.in' => 'Category must be one of: ' . implode(', ', self::CATEGORIES),
        ]);

        $expense = Expense::create($validated);

        return response()->json($expense, 201);
    }

    public function update(Request $request, string $id)
    {
        $expense = Expense::find($id);
        if (!$expense) {
            return response()->json(['message' => 'Expense not found'], 404);
        }

        $validated = $request->validate([
            'amount' => ['sometimes', 'required', 'numeric', 'gt:0'],
            'description' => ['sometimes', 'required', 'string', 'max:255'],
            'category' => ['sometimes', 'required', Rule::in(self::CATEGORIES)],
        ], [
            'amount.gt' => 'Amount must be greater than 0.',
            'category.in' => 'Category must be one of: ' . implode(', ', self::CATEGORIES),
        ]);

        $expense->update($validated);

        return response()->json($expense);
    }

    public function destroy(string $id)
    {
        $expense = Expense::find($id);
        if (!$expense) {
            return response()->json(['message' => 'Expense not found'], 404);
        }

        $expense->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
