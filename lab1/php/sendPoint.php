<?php
    $start_time = hrtime(true);

    
    if (!(isset($_GET['x']) && isset($_GET['y']) && isset($_GET['r']))) {
        echo 'Not enough parameters';
        http_response_code(422);
    } else {
        $x = floatval($_GET['x']);
        $y = floatval($_GET['y']);
        $r = floatval($_GET['r']);

        if (!(is_numeric($x) && $x >= -5 && $x <= 3)
        || !(is_numeric($y) && $y >= -3 && $y <= 5)
        || !(is_numeric($r) && $r <= 5 && $r >= 2)) {
        http_response_code(400);
        exit;
        }

        $hit = false;

        if ($x <= 0) {
            if ($y >= 0) {
                // Circle with radius r/2
                $rr = sqrt($x*$x + $y*$y);
                $hit = $rr <= $r/2;
            } else {
                // y = 2x - r
                $hit = $y >= (2*$x - $r);
            }
        } else {
            if ($y >= 0) {
                $hit = ($x <= $r) && ($y <= $r);
            } else {
                // autofail zone
                $hit = false;
            }
        }

        session_start();

        if ($hit) {
            $_SESSION['hit_message'] = 'Successful hit!';
        } else {
            $_SESSION['hit_message'] = 'Miss!';
        }



        $attempt = array(
            'id'=>1,
            'x'=>$x,
            'y'=>$y,
            'r'=>$r,
            'hit'=>$hit,
            'attempt_time'=>time(),
            'process_time'=>(hrtime(true) - $start_time)/1000000,
            'color'=>'rgb(' . rand(0, 255) . ',' . rand(0, 255) . ',' . rand(0, 255) . ')'
        );

        if (!isset($_SESSION['attempts'])) {
            $_SESSION['attempts'] = array($attempt);
        } else {
            $attempt['id'] = count($_SESSION['attempts']) + 1;
            array_push($_SESSION['attempts'], $attempt);
        }

        header('Content-Type: application/json');
        echo(json_encode($_SESSION['attempts']));
    }
?>