/*

This file exists because there is an existing bug in azure where old files are not deleted from the server after a deployment.

https://github.com/Azure/webapps-deploy/issues/20
https://github.com/projectkudu/kudu/issues/2822

I'm using this empty file as a workaround to replace the old file in the server, so that it stops trying to import supabase
Once these issues are fixed we can remove this file.
*/
