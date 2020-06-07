package com.tentsgame;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
//import com.facebook.react.bridge.ReadableArray;
//import com.facebook.react.bridge.WritableArray;
//import com.facebook.react.bridge.WritableNativeArray;

import org.chocosolver.solver.Model;
import org.chocosolver.solver.variables.IntVar;
import com.facebook.react.bridge.Callback;

//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
import java.util.Map;

//import com.google.gson.Gson;
//import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;


public class TentsSolver extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    private static int LENGTH_SHORT = DURATION_SHORT_KEY.length();
    private static int LENGTH_LONG = DURATION_LONG_KEY.length();

    TentsSolver(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public Map<String, Object> getConstants() {
//        final Map<String, Object> constants = new HashMap<>();
//        constants.put(DURATION_SHORT_KEY, TentsSolver.LENGTH_SHORT);
//        constants.put(DURATION_LONG_KEY, TentsSolver.LENGTH_LONG);
        return null;
    }

    public String getName() {
        return "TentsSolver";
    }

//    private ReadableArray PrimitiveToReadableArray(Integer[][] b, Integer size){
//        ReadableArray rres;
//        WritableArray wres = new WritableNativeArray();
//        List<List<Integer>> tmpBoard = new ArrayList<List<Integer>>(size);
//        for(int i = 0; i < size ; i++){
//            wres.pushInt();
//            }
//            tmpBoard.add(lst);
//        }
//
//    }


    @ReactMethod
    public void GenerateBoard(int size, int density,Callback callback, Callback errorCallback) {
        try {
            Integer[] Constrains_arr;
            Integer[][] board_arr;

            JsonArray BoardArr = new JsonArray();
            JsonArray ConstrainsArray = new JsonArray();
            JsonArray tmp = new JsonArray();
            JsonObject json = new JsonObject();

            boardInput b = new boardInput(size, density);

            json.addProperty("size", size);
            json.addProperty("density", density);

            board_arr = b.get_board();
            for (int i = 0; i < size; i++) {
                for (int j = 0; j < size; j++) {
                    tmp.add(board_arr[i][j]);
                }
                BoardArr.add(tmp);
                tmp = new JsonArray();
            }
            json.add("freshBoard", BoardArr);
            BoardArr = new JsonArray();


            Constrains_arr = b.getVertical();
            for (int i = 0; i < size; i++)
                ConstrainsArray.add(Constrains_arr[i]);
            json.add("vertical", ConstrainsArray);


            ConstrainsArray = new JsonArray();
            Constrains_arr = b.getHorizontal();


            for (int i = 0; i < size; i++)
                ConstrainsArray.add(Constrains_arr[i]);
            json.add("horizontal", ConstrainsArray);


            SolveBoard(b);


            board_arr = b.get_board();
            for (int i = 0; i < size; i++) {
                for (int j = 0; j < size; j++) {
                    tmp.add(board_arr[i][j]);
                }
                BoardArr.add(tmp);
                tmp = new JsonArray();
            }
            json.add("solvedBoard", BoardArr);


//            String json_str = json.toString();
//            System.out.println(json_str);
            callback.invoke(json.toString());
        }
        catch(Exception e){
            errorCallback.invoke(e.getMessage());
        }
    }



    public void SolveBoard(boardInput b){

        //Gson gson = new GsonBuilder().create();
        //boardInput b = gson.fromJson(JSONboard, boardInput.class);


        Integer[][] board = b.get_board();

        Integer[] vertical = b.getVertical();
        Integer[] horizontal = b.getHorizontal();
        Integer n = board.length;

    // Using Choco 4 Library

     /*Math work: Flattening a 3D Array/

       index = x + y * ((n+2)  + 1) + z * ((n+2)  + 1) * ((n+2)  + 1) - RIGHT!!
       size is (n+2 +1)*(n+2 +1)*(4 +1)
       Flat[x + HEIGHT* (y + WIDTH* z)] = Original[x, y, z], assuming Original[HEIGHT,WIDTH,DEPTH] - WRONG!!

       size of the array (n+2 +1)*(n+2 +1)*(4 +1)
       indes is i + j * ((n+2)  + 1) + k * ((n+2)  + 1) * ((n+2)  + 1)
       */
        Model model = new Model("Tents ILP");
        org.chocosolver.solver.Solver solver = model.getSolver();
        IntVar[] vars = new IntVar[(n+2 +1)*(n+2 +1)*(4 +1)];

        for(int i = 0; i < n + 2 + 1; i ++){
            for(int j = 0; j < n + 2 + 1; j++){
                for(int k = 0; k < 4 + 1; k++){
                    if((j==0||i==0||j==n+1||i==n+1)||(j==1&&k==0)||(j==n&&k==2)||(i==1&&k==1)||(i==n&&k==3)){

                        vars[i + j * ((n+2)  + 1) + k * ((n+2)  + 1) * ((n+2)  + 1)]  = model.intVar("x"+i+","+j+","+k, 0, 0);
                    }
                    else{
                        vars[i + j * ((n+2)  + 1) + k * ((n+2)  + 1) * ((n+2)  + 1)] = model.intVar("x"+i+","+j+","+k, 0, 1);
                    }
                }
            }
        }

        IntVar OBJ = model.intVar("objective", 0, n*n);

        int[] coeffs = new int[(n+2 +1)*(n+2 +1)*(4 +1)];
        for(int i = 0; i < n + 2 + 1; i ++){
            for(int j = 0; j < n + 2 + 1; j++){
                for(int k = 0; k < 4 + 1; k++){
                    coeffs[i + j * ((n+2)  + 1) + k * ((n+2)  + 1) * ((n+2)  + 1)] = 1;
                }

            }
        }
        model.setObjective(Model.MAXIMIZE, OBJ);
        model.scalar(vars, coeffs,"<=", OBJ).post();

        for(int i = 1; i <= n; i ++){
            for(int j = 1; j <= n; j++){
                IntVar[] tmp = {
                        vars[i + (j+1) * ((n+2)  + 1) + 0 * ((n+2)  + 1) * ((n+2)  + 1)],
                        vars[(i+1) + j * ((n+2)  + 1) + 1 * ((n+2)  + 1) * ((n+2)  + 1)],
                        vars[i + (j-1) * ((n+2)  + 1) + 2 * ((n+2)  + 1) * ((n+2)  + 1)],
                        vars[(i-1) + j * ((n+2)  + 1) + 3 * ((n+2)  + 1) * ((n+2)  + 1)]};

                model.scalar(tmp, new int[]{1,1,1,1},"=", board[i-1][j-1]).post();

            }
        }

        for(int i = 1; i <= n; i ++){
            for(int j = 1; j <= n; j++){

                IntVar[] tmp = {
                        vars[i + 0 + (j + 0) * ((n + 2) + 1) + 0 * ((n + 2) + 1) * ((n + 2) + 1)],
                        vars[i + 1 + (j + 0) * ((n + 2) + 1) + 0 * ((n + 2) + 1) * ((n + 2) + 1)],
                        vars[i + 0 + (j + 1) * ((n + 2) + 1) + 0 * ((n + 2) + 1) * ((n + 2) + 1)],
                        vars[i + 1 + (j + 1) * ((n + 2) + 1) + 0 * ((n + 2) + 1) * ((n + 2) + 1)],

                        vars[i + 0 + (j + 0) * ((n + 2) + 1) + 1 * ((n + 2) + 1) * ((n + 2) + 1)],
                        vars[i + 1 + (j + 0) * ((n + 2) + 1) + 1 * ((n + 2) + 1) * ((n + 2) + 1)],
                        vars[i + 0 + (j + 1) * ((n + 2) + 1) + 1 * ((n + 2) + 1) * ((n + 2) + 1)],
                        vars[i + 1 + (j + 1) * ((n + 2) + 1) + 1 * ((n + 2) + 1) * ((n + 2) + 1)],

                        vars[i + 0 + (j + 0) * ((n + 2) + 1) + 2 * ((n + 2) + 1) * ((n + 2) + 1)],
                        vars[i + 1 + (j + 0) * ((n + 2) + 1) + 2 * ((n + 2) + 1) * ((n + 2) + 1)],
                        vars[i + 0 + (j + 1) * ((n + 2) + 1) + 2 * ((n + 2) + 1) * ((n + 2) + 1)],
                        vars[i + 1 + (j + 1) * ((n + 2) + 1) + 2 * ((n + 2) + 1) * ((n + 2) + 1)],

                        vars[i + 0 + (j + 0) * ((n + 2) + 1) + 3 * ((n + 2) + 1) * ((n + 2) + 1)],
                        vars[i + 1 + (j + 0) * ((n + 2) + 1) + 3 * ((n + 2) + 1) * ((n + 2) + 1)],
                        vars[i + 0 + (j + 1) * ((n + 2) + 1) + 3 * ((n + 2) + 1) * ((n + 2) + 1)],
                        vars[i + 1 + (j + 1) * ((n + 2) + 1) + 3 * ((n + 2) + 1) * ((n + 2) + 1)],
                };

                model.scalar(tmp, new int[]{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},"<=", 1).post();
            }
        }
        IntVar[] var_list = new IntVar[4*n];
        int[] coeff_list = new int[4*n];
        int t = 0;

        for(int i = 1; i <= n; i ++){
            for(int j = 1; j <= n; j++){
                for(int k = 0; k < 4; k++){
                    var_list[t] = vars[i + j * ((n+2)  + 1) + k * ((n+2)  + 1) * ((n+2)  + 1)];
                    coeff_list[t] = 1;
                    t++;
                }
            }
            t = 0;
            model.scalar(var_list, coeff_list,"=", vertical[i-1]).post();

            var_list = new IntVar[4*n];
            coeff_list = new int[4*n];
        }

        for(int i = 1; i <= n; i ++){
            for(int j = 1; j <= n; j++){
                for(int k = 0; k < 4; k++){


                    var_list[t] = vars[j + i * ((n+2)  + 1) + k * ((n+2)  + 1) * ((n+2)  + 1)];
                    coeff_list[t] = 1;
                    t++;
                }
            }
            t = 0;
            model.scalar(var_list, coeff_list,"=", horizontal[i-1]).post();


            var_list = new IntVar[4*n];

        }


        model.getCstrs();
        solver.solve();

        solver.printFeatures();
        solver.showStatistics();
        solver.showSolutions();
        solver.findSolution();

        b.adaptSolutionlp(vars);


    }

}
