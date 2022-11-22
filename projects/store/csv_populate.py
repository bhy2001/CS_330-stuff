import csv

table_head = ['name', 'author', 'publisher', 'price']
tablde_data = [
    ['Naruto', 'Masashi Kishimoto', 'Shueisha', 30],
    ['Dragon Ball', 'Akira Toriyama', 'Shueisha', 25],
    ['One Piece', 'Eiichiro Oda', 'Shueisha', 45],
    ['A Comic I Made Up','Bill Dang', 'LC Inc', 65],
    ['Another Comic I Made Up','Hy Dang', 'LC Inc', 75]
]

with open('for-population.csv', 'w', encoding='UTF8', newline='') as f:
    writer = csv.writer(f)
    # write the header
    writer.writerow(table_head)
    # write multiple rows
    writer.writerows(tablde_data)