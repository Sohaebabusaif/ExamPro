#!/bin/bash
# يفتح هذا الملف المشروع في المتصفح الافتراضي على أنظمة الماك ولينكس
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
if command -v xdg-open &> /dev/null
then
  xdg-open "$DIR/index.html"
elif command -v open &> /dev/null
then
  open "$DIR/index.html"
else
  echo "لا يمكن تحديد نظام التشغيل أو المتصفح."
fi
