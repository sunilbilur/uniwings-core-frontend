import os

sync_file = open(os.path.join(os.path.dirname(__file__), "comp-sync-file.txt"), "w")

#recursively list out all files from app-components folder ending with .component.ts
for root, dirs, files in os.walk("./app-components"):
    for file in files:
        if file.endswith(".component.ts"):
            print ("file:",os.path.join(root, file))
            sync_file.write(file.removesuffix(".component.ts")+"\n")
            
sync_file.close()

