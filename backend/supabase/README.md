BACKEND

The backend uses supabase as the full suite.

ENDPOINTS

You can interact with the backend in 3 ways :

1. Direct interaction thanks to the supabase sdk
   This is good for simple actions, such as deleting a row in a table. Do not perform tricky sql actions such as JOIN or operations on aggregations in the frontend. Having a dedicated endpoint is better in the long run
2. Using database functions
   These are SQL functions. With them you can do basically anything, and you can write them in sql or plpgsql. Whenever you write a db function, DO NOT FORGET to replicate it in the folder database_functions. The greatest advantage is that you can perform tricky sql operations in those. However they are very hard to debug
3. Using Edge functions (supabase cloud functions)
   Cloud functions. Typescript. Can be run locally, have logs on the console. Great but expensive if too much called. Advantage: good for debug, but cannot perform directly complicated sql operations. However, you can call an RPC inside an Edge function.

Running the project locally for tests.
See [supabase docs](https://supabase.com/docs/guides/cli/local-development) for basic stuff (link with project, pull schema).
See in package.json, you have pre-built commands :

- yarn update-db: pulls the remote db and updates your local db according to the remote data
- yarn reset: resets the local db. If you pull something from remote you need to run this to see the changes
- yarn checkout:(fromEnv-toEnv) : stores the current migrations in the corresponding folder, and places the env migrations in the migrations folder. You can run this command whenever you link to another project (for exemple, I am working on dev and will work on staging. So I run supabase link to link to staging project, and to have the correct migrations I run yarn checkout:dev-staging)
- yarn deploy (name) : deploy "name" function

To run locally :
link
run supabase db pull. When prompted to update remote, say no.
If you want to have the remote data, run "yarn diff && yarn dump".
Run supabase start.

If the command crashes with a wierd message "table perfs does not exist", you need to go to the migrations folder, open the migrations, look for any line with the word "trigger" in it and comment the corresponding piece of code. Triggers do not work locally for some reason

Then yun supabase start again. Congrats, you have your local project running !

To pass tests, do not dump the remote database. Data instantiation is all done in **test**/shared/setup
