<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class BudgetReport extends Mailable {

    use Queueable,
        SerializesModels;

    public $msg;
    public $user;
    public $item;

    public function __construct($msg, $item, $user) {

    	$this->msg = $msg;
        $this->item = $item;
        $this->user = $user;

    }

    //build the message.
    public function build() {

    	$msg = $this->msg;
        $item = $this->item;
        $user = $this->user;

        return $this->view('report/budget-report');
    }
}
