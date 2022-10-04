import json 


# the file to be converted to 
# json format 
filename = 'block.txt'

# dictionary where the lines from 
# text will be stored 

dict1 = []
out_file = open("Logs.json", "w") 
# creating dictionary 

with open(filename) as fh: 

	for line in fh: 

		# reads each line and trims of extra the spaces 
		# and gives only the valid words 
		dict1.append(line.strip())

# creating json file 
# the JSON file is named as test1 

json.dump(dict1, out_file) 
out_file.close() 