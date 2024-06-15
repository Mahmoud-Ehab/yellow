# StateFile in Abstract

A StateFile can be abstractly defined as an object that permanently holds a substate of the application. 

A StateFile contains and defines the structure of units of data to be hold, it supplies users, as well, with facilities to retrieve, update, or remove data (all, specific or filtered), and it takes control of saving and loading date to and from permanent storage disks. Furthermore, it can crack data into several saved files, and it does it in several means: either by specifying, by the user, a limit on the size of each saved file, by cracking in half the last saved file, or by sealing the current file and add a new one above it. 

Lastly, saved files shall have a conventional naming syntax that would facilitates automatically reaching it, and it shall contain a header or a metadata part in it, that contains the name of the substate it belongs to, and the order in which it's been created among other cracks (saved files).


# StateFile Implementation

## Naming Syntax & File Structure

## Storing and Cracking Data

## Access and Manipulate Data
