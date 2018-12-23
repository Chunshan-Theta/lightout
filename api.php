<?PHP
	require('config.php');
	$act=isset($_GET['act'])?$_GET['act']:null;
  $tag=isset($_GET['tag'])?$_GET['tag']:'3*3';
  $name=isset($_GET['name'])?$_GET['name']:'no name';
  $sec=isset($_GET['sec'])?$_GET['sec']:null;

	switch($act){
		case 'insert':
		/*
			*新增事件
			*觸發事件後，首先先設一個自訂變數(data)以陣列方式去接收數值(title,content,auther)
			*再次設定一個新的自訂變數(query)去準備路徑和功能(INSERT)
			*INSERT INTO test(test欄位)VALUE (數據)
			*準備完後就以execute關鍵字去執行，便完成新增事件
			*最後用header('Location:首頁網址');回到首頁(text.php)
		*/
      $sql = 'INSERT INTO rank(id,name,sec,tag)VALUE (null,"'.$name.'","'.$sec.'","'.$tag.'")';
      //echo $sql;
      $query = $_link->prepare($sql);
			$query->execute();
			//header('Location:text.php');
      echo "done";
		break;

		default:
		/*
			*顯示全部留言紀錄
			*當act沒有數值時觸發
			*首先先設一個自訂變數(view)以陣列方式去準備路徑和功能(SELECT)
			*再次設定一個新的自訂變數(query)去準備路徑和功能↓
			*$view = $_link->prepare('SELECT * FROM test');
			*!!! * 是全部的意思 !!!
		*/
      //echo 'SELECT * FROM rank WHERE `tag`='.$tag;
			$view = $_link->prepare('SELECT * FROM rank WHERE `tag`="'.$tag.'" ORDER BY `sec` ASC LIMIT 10');
			$view->execute();
			$result = $view->fetchAll(PDO::FETCH_OBJ);
      echo json_encode($result);

	}
?>
