<?php
namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Budget;
use App\Item;

class UserBudgetController extends Controller
{

    public function showOne(Request $request, $id) {
        $user = Auth::user();
        $budget = Budget::where('id', $id)->where('owner_id', $user->id)
                  ->withCount('items')
                  ->orderBy('id', 'desc')
                  ->get();

        if ($budget) {
            $msg['budget'] = $budget;
            $msg['message'] = 'Successful';
            return response()->json([$msg], 200);
        }else {
            $msg['message'] = 'Not Found';
            return response()->json([$msg], 404);
        }
    }
     public function showAll(Request $request) {
        $user = Auth::user();
        $budget = Budget::where('owner_id', $user->id)
                  ->withCount('items')
                  ->orderBy('id', 'desc')
                  ->get();

        if ($budget) {
            $msg['budget'] = $budget;
            $msg['message'] = 'Successful';
            return response()->json([$msg], 200);
        }else {
            $msg['message'] = 'Not Found';
            return response()->json([$msg], 404);
        }
    }
	public function create(Request $request, Budget $budget)
    {
        $user = Auth::user();
        $this->validateRequest($request);
        //start temporay transaction
        DB::beginTransaction();
        try {
            $curr = explode("", $user->total_income);
            if($request->input('currency') != $curr[0]){
                $msg['error'] = "Error: Currency Must be the same as your total income!";
                $msg['hint'] = $e->getMessage();
                return response()->json($msg, 422);
            }
            $budget_amount = number_format($request->input('amount'), 2); 
            // $real_integer = filter_var($price, FILTER_SANITIZE_NUMBER_INT);

            $budget->title = $request->input('title');
            $budget->owner_id = Auth::user()->id;
            $budget->description = $request->input('description');
            $budget->budget_amount = $request->input('currency') ." ". $budget_amount;
            $budget->save();

            $msg['budget']  =  $budget;
            $msg['message'] = "Budget has been created, add items to allocate budget!";
            // //if operation was successful save changes to database
            DB::commit();

            return response()->json($msg, 201);

        }catch(\Exception $e) {

            //if any operation fails, Thanos snaps finger - user was not created
            DB::rollBack();

            $msg['error'] = "Error: Budget not created, please try again!";
            $msg['hint'] = $e->getMessage();
            return response()->json($msg, 501);


        }


    }

    public function update(Request $request, $id) {
        $user = Auth::user();
         $this->validateRequest($request);
        //start temporay transaction
         try { 
             $curr = explode("", $user->total_income);
            if($request->input('currency') != $curr[0]){
                $msg['error'] = "Error: Currency Must be the same as your total income!";
                $msg['hint'] = $e->getMessage();
                return response()->json($msg, 422);
            }

            $budget = Budget::find($id);
            $budget_amount = number_format($request->input('amount'), 2); 
            // $real_integer = filter_var($price, FILTER_SANITIZE_NUMBER_INT);
            if ($budget) {
                $budget->title = $request->input('title');
                $budget->owner_id = Auth::user()->id;
                $budget->description = $request->input('description');
                $budget->budget_amount = $request->input('currency') ." ". $budget_amount;
                $budget->save();
            }else{
                $msg['message'] = "Budget not found!";
                return response()->json($msg, 404);
            }
           
            $msg['budget']  =  $budget;
            $msg['message'] = "Budget has been updated!";
            // //if operation was successful save changes to database
            DB::commit();

            return response()->json($msg, 200);

        }catch(\Exception $e) {

            //if any operation fails, Thanos snaps finger - user was not created
            DB::rollBack();

            $msg['error'] = "Error: Budget not updated, please try again!";
            $msg['hint'] = $e->getMessage();
            return response()->json($msg, 501);


        }

    }

    public function destroy($id) {
        $user = Auth::user();
        $del_budget = Budget::where('id', $id)->where('owner_id', $user->id)->first();
        if($del_budget) {
            $del_budget->delete();
            $res['success'] = true;
            $res['message'] = 'Budget deleted!';
            return response()->json($res);
        }else {
            $res['error'] = false;
            $res['message'] = 'Budget not found!';
            return response()->json($res);
        }
    }

    public function validateRequest(Request $request){
		$rules = [
			'title' => 'required|string',
			'description' => 'string',
            'currency' => array(
                              'required',
                              'regex:/(^([NGN,USD,EUR,GBR]+)(\d+)?$)/u'
                            ),
			'amount' => array(
                              'required'
                            ),
		];

		$messages = [
			'required' => ':attribute is required',
            'currency' => ':attribute should have currency signs only!',
            'amount' => ':attribute should be an integer value!'
		];

		$this->validate($request, $rules, $messages);
		}

}
