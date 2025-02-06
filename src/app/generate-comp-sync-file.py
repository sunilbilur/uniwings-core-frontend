import os

sync_file = open(os.path.join(os.path.dirname(__file__), "comp-sync-file.txt"), "w")

sync_file.write("[\n")

file_names = ""

#recursively list out all files from app-components folder ending with .component.ts
for root, dirs, files in os.walk("./app-components"):
    for file in files:
        if file.endswith(".component.ts"):
            print ("file:",os.path.join(root, file))
            file_names += "\"" + file.removesuffix(".component.ts")+"\",\n"

            
sync_file.write(file_names.removesuffix(",\n"))
sync_file.write("\n]\n")
sync_file.close()

