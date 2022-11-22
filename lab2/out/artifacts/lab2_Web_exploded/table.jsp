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
<header>
  Тюрин Святослав <br>
  Группа P32302 <br>
  Вариант 44
</header>
<div class="inputFields2">
  <div class="container2">
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
</div>
<div class="link-back">
  <a href="index.jsp">вернуться назад</a>
</div>

</body>
</html>