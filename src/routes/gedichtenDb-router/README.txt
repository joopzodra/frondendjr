In Sequelize, the models for Poet and Bundle have an id column, which is deliberately not a primary key nor has it autoincrement set. The id for these models is set manually in the /create route of gedichtenDb-manager.js.

But: Sequelize doesn't allow in the models that the 'id' attribute is not primary key, autoincrement.

The solution is to create another column and set that one as primary key and autoincrement. Therefore the Poet and Bundle model have an item_id column. In our queries, we don't use these. They're just there because of the Sequelize contstraint. (Maybe this constraint has a purpose, like performance benefit?)

===============

Just in case you want Sequelize to set new db tables. They run the sql query CREATE IF NOT EXIST. So they only create the tables if they don't exist. If they do exist, nothing happens.

Place them in gedichtenDb-router.js.

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