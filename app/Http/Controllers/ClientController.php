<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class ClientController extends Controller
{
    public function upload(Request $request) {
        $pdo = DB::connection()->getPdo();
        // dd($request->archivo->path());
        $pdo->exec("LOAD DATA LOCAL INFILE ".$pdo->quote($request->archivo->path())." INTO TABLE tmp_clientes FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"' LINES TERMINATED BY '\r' IGNORE 1 LINES");
        return response()->json(['success' => true], Response::HTTP_OK);
    }

    public function list(Request $request) {
        $clientes = Cliente::with(['direccion','telefono'])->get();

        return response()->json(compact('clientes'), Response::HTTP_OK);
    }
}
