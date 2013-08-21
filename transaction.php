<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);


include ("lib/Braintree.php");
include ("lib/braintreeconfig.php");

$result = Braintree_Transaction::sale(array(
    "amount" => $_REQUEST["amount"],
    "creditCard" => array(
        "number" => $_REQUEST["number"],
        "cvv" => $_REQUEST["cvv"],
        "expirationMonth" => $_REQUEST["month"],
        "expirationYear" => $_REQUEST["year"]
    ),
    "options" => array(
        "submitForSettlement" => true
    )
));

if ($result->success) {
    echo("Success! Transaction ID: " . $result->transaction->id);
} else if ($result->transaction) {
    echo("Error: " . $result->message);
    echo("<br/>");
    echo("Code: " . $result->transaction->processorResponseCode);
} else {
    echo("Validation errors:<br/>");
    foreach (($result->errors->deepAll()) as $error) {
        echo("- " . $error->message . "<br/>");
    }
}

?>