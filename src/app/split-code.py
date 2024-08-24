import os

comp = open("./manual-code-splitting/manual-code-splitting.component.ts","w")

#recursively list out all files from app-components folder ending with .component.ts
for root, dirs, files in os.walk("./app-components"):
    for file in files:
        if file.endswith(".component.ts"):
            print (os.path.join(root, file))
            comp.write("import('."+os.path.join(root, file.removesuffix(".ts"))+"')" +"\n")

comp.write("export class ManualCodeSplittingComponent {} \n")
comp.close()

