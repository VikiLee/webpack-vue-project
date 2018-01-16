@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\..\..\_extract-zip@1.6.6@extract-zip\cli.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\..\..\_extract-zip@1.6.6@extract-zip\cli.js" %*
)