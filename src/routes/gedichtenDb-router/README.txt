When you should ever start again with a fresh, new, empty database, read on!

Sequelize doesn't allow in the models that the 'id' attribute is not primary key, autoincrement.
But, beware: in the gedichtenDb both the poets-table and the bundles-table have an 'id' column that is set only on 'not null'; they're no primary key columns!

What to do: use the app DB Browser for SQLite to manually set the constraints on the id columns to NOT NULL, and to disable the PRIMARY KEY and AUTOINCREMENT contraints.

===============

Just in case you want Sequelize to set new db tables. They run the sql query CREATE IF NOT EXIST. So they only create the tables if they don't exist. If they do exist, nothing happens.


const User = sequelize.import(path.join(__dirname, 'models/user'));
const Poem = sequelize.import(path.join(__dirname, 'models/poem'));
const Poet = sequelize.import(path.join(__dirname, 'models/poet'));
const Bundle = sequelize.import(path.join(__dirname, 'models/bundle'));


/ Only when using a new DB. Sequelize sync method syncs all defined models to the DB. In this case a new table Session will be added to the DB.
// seqStore.sync(); 

User.sync();
Poem.sync();
Poet.sync();
Bundle.sync();