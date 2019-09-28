<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('owner_id');
            $table->unsignedInteger('budget_id');
            $table->string('title');
            $table->string('item_amount');
            $table->string('priority');
            $table->unsignedInteger('tag');
            $table->string('category');
            $table->string('description');
            $table->timestamps();

              $table->foreign('owner_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

              $table->foreign('budget_id')
                ->references('id')
                ->on('budgets')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
}
