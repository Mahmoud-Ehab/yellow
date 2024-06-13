import { File, FileManager } from './modules/FileManager';

const fileManager = new FileManager({});

const newfile = new File("./testing", "");
newfile.setContent("Some new content");

fileManager.addFile("testing", newfile);
newfile.appendContent(" - manually appended content");

fileManager.simulFile(fileManager.getFile("testing"));
newfile.appendContent(" - testing simultaneous writing...");
fileManager.unSimulFile(fileManager.getFile("testing"));

newfile.appendContent(" - appended after unsimul.");
