<?php
define('DB_PATH', '140.115.126.20'); //設定資料庫路徑
define('DB_NAME', 'lightout'); //設定資料庫名稱
define('DB_USER', 'client'); //設定資料庫帳號
define('DB_PASSWORD', 'client'); //設定資料庫密碼
///
//建立PDO連線
$_link = new PDO('mysql:host='.DB_PATH.';charset=utf8mb4;dbname='.DB_NAME, DB_USER, DB_PASSWORD);
//設定編碼
$_link->query('SET NAMES utf8mb4')->execute();
?>
