$(document).ready(()=>{
        

    $('.add-expense-btn').click(()=>{
        add_new_record('expense');
    })
    $('.add-income-btn').click(()=>{
        add_new_record('income');
    })

    $(document).on('click', '.remove-income-btn', function(){
        remove_record(this, 'input[name="exp[]"]', [0, 1]);
    })

    $(document).on('click', '.remove-expense-btn', function(){
        remove_record(this, 'input[name="inc[]"]', [2, 3]);
    })
    
})

function remove_parent_row(element) {
    element.remove();
}

function empty_parent_row(element, inx) {
    element.children().map((i, el)=>{
        if(i == inx[0] || i == inx[1]) {
            $(el).html('');
        } 
    })
}

function remove_record(element, search_input, indexes) {
    var parent_row = $(element).closest('tr');
    parent_row.find(search_input).length > 0 ? empty_parent_row(parent_row, indexes) : remove_parent_row(parent_row);    
}


function add_new_record(type) {
    var short_form = type === 'income' ? 'inc' : 'exp';
    var inx = type === 'income' ? [0, 1] : [2, 3];

    var item = $('input[name="'+type+'"]').val();
    var item_amt = $('input[name="'+type+'_amt"]').val();

    
    if(item.length > 0 && item_amt.length > 0 && /^[0-9]*$/.test(item_amt)) {

        var last_row = $('tbody tr:not(.head-inputs)').last();

        var row = last_row.length > 0 ? find_child(last_row, short_form) ? false 
                    : check_prev(last_row, short_form)
                    : false;
    
        var remove_btn = '<i class="glyphicon glyphicon-minus i-btn remove-'+type+'-btn"></i>';

        if(!row) {
            var tr = "<tr><td></td><td></td><td></td><td></td></tr>";
            $('tbody').append(tr);
            row = $('tbody tr').last();
        }
        

        var itm = "<input type='text' class='td-inpt' readonly name='"+short_form+"[]' value=' "+item+" '> ";
        var itm_amt = "<input type='text' class='td-inpt' readonly name='"+short_form+"_amt[]' value=' "+item_amt+" '> ";

        
        row.children().map((i, el)=>{
            if(i == inx[0]) {
                $(el).html(remove_btn+itm);
            } else if(i == inx[1]) {
                $(el).html(itm_amt);
            }
        })

        $('input[name="'+type+'"]').val('');
        $('input[name="'+type+'_amt"]').val('');
    } else {
        alert('Please enter the valid '+type+' source and amount');
    }
}

function check_prev(element, input_name) {
    var prev_input = $(element).prev().not('.head-inputs'); 

    if (prev_input.length > 0) {
        if (!find_child(prev_input, input_name)) {
            return check_prev(prev_input, input_name);
        } 
    } 
    return element;                  
}

function find_child(element, name) {
    return element.children().find("input[name='"+name+"[]']").length > 0;
}