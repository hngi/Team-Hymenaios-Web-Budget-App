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

class CalculatorController extends Controller
{

    public function calculate($budget_id) {
        $budget = Budget::where('id', $budget_id)->where('owner_id', Auth::user()->id)->first();
        $items = item::where('budget_id', $budget_id)
                ->orderBy('tag', 'desc')
                ->get();
        if ($budget) {
                     //format budget money
                $format_budget = explode(".", $budget->budget_amount);
                $format_budget_2 = filter_var($format_budget[0], FILTER_SANITIZE_NUMBER_INT);
                $allocated = [];
                $not_allocated = [];
                $low_budget = [];

                foreach ($items as $item) {
                    $format_item  = explode(".", $item->item_amount);
                    $format_item_2 = filter_var($format_item[0], FILTER_SANITIZE_NUMBER_INT);

                    if ( $format_budget_2 > 0) {
                        $format_budget_2 = $format_budget_2 - $format_item_2;
                        $details = explode("-", $format_budget_2);
                        if ($details[0] == "") {
                             array_push($low_budget, $details[1]);
                             array_push($not_allocated, $item);
                             $msg['message'] = "Allocated and Not allocated budget items!";
                             $msg['low_budget'] =  $low_budget;
                             $msg['allocated'] =  $allocated;
                             $msg['not_allocated'] =  $not_allocated;
                             return response()->json($msg, 200);
                        }else {
                            array_push($allocated, $item);
                        } 
                    }else {
                        array_push($not_allocated, $item);
                    }
                }
            $msg['message'] = "Allocated and Not allocated budget items!";
            $msg['allocated'] =  $allocated;
            $msg['low_budget'] =  $low_budget;
            $msg['not_allocated'] =  $not_allocated;
            return response()->json($msg, 200);
        }else {
            $msg['error'] = "Error: Budget not allowed, please try again!";
            return response()->json($msg, 402);
        }
      

    }
}
