<%@ page import="java.util.ArrayList" %>
<%@ page import="utils.Result" %>
<%@ page import="beans.ClientData" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<% ArrayList<Result> data;
    Object attribute = request.getSession().getServletContext().getAttribute("data");
    if(attribute !=null){
        data = (ArrayList<Result>) attribute;
    } else {data = new ArrayList<>();}
%>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <link href="css/stylesMain.css" rel="stylesheet">
    <title>Web #2</title>
    <link rel="icon" href="staff/icon.png">
</head>
<body>

    <script>
        const POINTS = [
         <% if(data!=null){
                for (Result result : data) {
         %>
            {
                x: <%= result.getX() %>,
               y: <%= result.getY() %>,
               r: <%= result.getR() %>
         },
         <%
             }
         }
         %>
        ]
    </script>
    <header>
        Тюрин Святослав <br>
        Группа P32302 <br>
        Вариант 44
    </header>
    <div class="background">
        <div class="inputFields">
            
            <div class="task">
                    <div class="headerText">
                        Введите данные на проверку вхождения в область значений данного графика:
                    </div>  
                </div> 
                
                <div class="xRect"> 
                    <label for="xVal">X</label>
                    <select name = "xVal" id = "xVal" class = "xVal" >
                        <option disabled selected></option>
                        <option value="-5">-5</option>
                        <option value="-4">-4</option>
                        <option value="-3">-3</option>
                        <option value="-2">-2</option>
                        <option value="-1">-1</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div class="yRect">
                    <label for="yVal">Y</label>
                    <input type="number"  name = "yVal" id = "yVal" class = "yVal"  placeholder="от -3 до 5">
                </div>
                <div class="rRect" id = "rRect">
                    <label>R</label>
                    <input type="radio" id="contactChoice1" name="rContact" value="1">
                    <label for="contactChoice1">1</label>
                    
                    <input type="radio" id="contactChoice2" name="rContact" value="2">
                    <label for="contactChoice2">2</label>
                    
                    <input type="radio" id="contactChoice3" name="rContact" value="3" checked="checked">
                    <label for="contactChoice3">3</label>

                    <input type="radio" id="contactChoice4" name="rContact" value="4">
                    <label for="contactChoice2">4</label>
                    
                    <input type="radio" id="contactChoice5" name="rContact" value="5">
                    <label for="contactChoice3">5</label>

                </div>

                <div id="trouble">
                </div>
                

            <div class="container">
                <table id='result-table' border="1" width="100%">
                    <thead>
                    <tr>
                        <th class="coords-column">X</th>
                        <th class="coords-column">Y</th>
                        <th class="coords-column">R</th>
                        <th class="time-column">Current time</th>
                        <th class="time-column">Execution time</th>
                        <th>Hit fact</th>
                    </tr>
                    </thead>
                    <tbody id="result-table-body">
                    <c:if test="${data!=null}">
                        <c:forEach items="${data}" var="result">
                            <tr>
                                <td>${result.getX()}</td>
                                <td>${result.getY()}</td>
                                <td>${result.getR()}</td>
                                <td>${result.getCurrentTime()}</td>
                                <td>${result.getExecutionTime()}</td>
                                <td>${result.getHitFact()}</td>
                            </tr>
                        </c:forEach>
                    </c:if>
                    </tbody>
                </table>
            </div>
            <div class="imageRect">
                <canvas id="graph" class="graph" width="400" height="400">
                    <img src="staff/batman.png" alt="Бэтман" id="batmanImage" width="150" height="150">
                </canvas>
            </div>
            <div class="ckeckBtn">
                <input id="checkBtn" name="checkBtn" class="button" type="submit" title="Проверить">
            </div>
            <div class="ckeckBtn2">
                <input id="clearBtn" name="clearBtn" class="button" type="reset">
            </div>
           
            

        </div>

            <a href="https://github.com/svytoq" id="illuminated" title="Перейти к профилю Github разработчика" style="position:relative;left:10px;bottom:0px;z-index:1000;">Svytoq</a>
        </div>>

        <script src="js/validation.js"></script>
        <script src="js/graph.js"></script>
</body>
</html>