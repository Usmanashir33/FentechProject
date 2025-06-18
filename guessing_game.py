#import numpy as np
list1 = [ x for x in range(1,22,)]
list2 = []
list3 = []

def show_answer(last_list) :
    displayer = f"""
                The Number That You Choose is :  {last_list[10]}
    """
    print(displayer)
    
def show_selections(from_list) :
    display_1= []
    display_2= []
    display_3= []
    
    ''' Start distribution to the above lists'''
    rstart = 0 #range to start 
    for i in range(7) :
        no_taken = from_list[rstart]
        rstart += 3
        display_1.append(no_taken)
        
    rstart2 = 1 #range to start 
    for i in range(7) :
        no_taken = from_list[rstart2]
        rstart2 += 3
        display_2.append(no_taken)
        
    rstart3 = 2 #range to start 
    for i in range(7) :
        no_taken = from_list[rstart3]
        rstart3 += 3
        display_3.append(no_taken)
    displayer = f"""
            
            [A] :- {display_1}
            [B] :- {display_2}
            [C] :- {display_3}
    
    """
    return print(displayer)

def distribution(from_list,choice) :
    temp_list_A=[] # new list created 1
    temp_list_B=[] # new list created 2
    temp_list_C=[] # new list created 3
   
    rstart = 0 #range to start 
    for i in range(7) :
        no_taken = from_list[rstart]
        rstart += 3
        temp_list_A.append(no_taken)
        
    rstart2 = 1 #range to start 
    for i in range(7) :
        no_taken = from_list[rstart2]
        rstart2 += 3
        temp_list_B.append(no_taken)
        
    rstart3 = 2 #range to start 
    for i in range(7) :
        no_taken = from_list[rstart3]
        rstart3 += 3
        temp_list_C.append(no_taken)
        
    """ assign the to_list varible new value using global """
    combined =[]
    if choice == "A" :
        combined = temp_list_B + temp_list_A + temp_list_C
    if choice == "B" :
        combined = temp_list_A + temp_list_B + temp_list_C
    if choice == "C" :
        combined = temp_list_A + temp_list_C + temp_list_B
        
    return combined
def play_game() :
    while True :
        print(f"""
   *********************************************************""")
        statement =f"""
             CHOOSE ANY NUMBER FROM 1 to  21
           JUST TELL ME ITS IN GROUP (A,B or C)?,
           IWILL TELL YOU THE NUMBER after 2 GROUPING. 
             YOU CAN DO IT MILLIONS TIMES AFTER I TOLD YOU THE SECRET NUMBER.""" 
        print(statement)
        show_selections(list1)
        choice1 = input( "Select Room of Your Choice From The Above1 : ").upper()
        """ Assign list 2 to be the combined from list 1 after selection
        """
        list2 = distribution(list1, choice1)
        show_selections(list2)
        choice2 = input( "Select Room of Your Choice From The Above2 : ").upper()
        
        """Assign list 3 to be the list of combined from list 2 after selction
        """
        list3 = distribution(list2, choice2)
        show_selections(list3)
        choice3 = input( "Select Room of Your Choice From The Above3 : ").upper()
        answer = distribution(list3, choice3)
        show_answer(answer)
        print("*********************************************************")    
        

play_game()
# Now the game is successfully 
# Alhamdulillahi rabbil alamin. 