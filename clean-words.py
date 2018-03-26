# Remove any words:
#   - starting with uppercase (proper nouns)
#   - containing an "'" (compound words)

# Bonus! Puts each line into a string in an array (JSON)

with open('words-clean.json', 'w') as clean:
    with open('words.txt', 'r') as words:
        clean.write('[\n')
        for line in words:
            if not any(c.isupper() for c in line) and "'" not in line:
                clean.write('"' + line[:-1] + '", \n')
        clean.write(']')
