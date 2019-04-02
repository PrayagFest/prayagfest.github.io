$( document ).ready(function() {
    var events_cnt = 0;
    var acc = document.getElementsByClassName("accordion");
    var i;
    
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function(e) {
        var checked_rows = $(this).next('.panel').find('.row-selected')
        if(checked_rows.length == 0){
          this.classList.toggle("active");
          var panel = this.nextElementSibling;
          if (panel.style.display === "block") {
            panel.style.display = "none";
          } else {
            panel.style.display = "block";
          }
        }else{
          e.stopPropagation();
          e.preventDefault();

        }
      });
    }
    function accord_click(e){
      e.preventDefault();
      e.stopPropagation();
      var box = $(this).children('.check-span').find('input');
      box.prop('checked',!box.prop('checked'));
      if(box.prop('checked')){
        $(this).addClass('row-selected')
      }else{
        $(this).removeClass('row-selected')
      }
      calc_bill()
    }
    $('.part-row-add').click(click_fun_add)
    var id_counter = 1;   
    function click_fun_add(e){
            if($('.participant-row:last').find('input').val() != ""){
              var new_row =   $('<div class = "participant-row"> <div class = "part-cont-row"><input type="text" class="form-control part-name width-120" ' +
                'value="" name="p'+id_counter+'" id ="'+id_counter+'"><div'+
                ' class="part-row-add btn btn-primary fa fa-plus"></div><div class="btn btn-secondary part-row-del fa fa-minus"></div><div class="clear"></div></div></div>').insertAfter($('.participant-row:last'))
              $(new_row).find('.part-row-add').bind('click',click_fun_add)
              $(new_row).find('.part-row-del').bind('click',click_fun_del)
              $(new_row).find('.part-row-del').bind('click',on_participants_change)
              id_counter++;
              $(this).parent().find('.part-row-del').hide()
              $(this).parent().find('.part-row-add').hide()
              $(this).parent().find('.part-name').removeClass('width-60').removeClass('width-120');
              $(this).hide()
              $('.part-name').unbind('change').bind('change',on_participants_change)
              calc_bill()
          }else{
            $('.participant-row:last').find('input').css({'border-color':'bg-secondary'})
          }
        }
    function click_fun_del(){
            $(this).parents('.participant-row').remove()
            var last_elem = $('.participant-row:last');
            last_elem.find('.part-row-add').show()
            last_elem.find('.part-row-del').show()
            var last = last_elem.find('.part-name').attr('id')
            if(last == 0){
                last_elem.find('.part-name').addClass('width-60')
            }else{
                last_elem.find('.part-name').addClass('width-120')
            }
            if(id_counter > 2)
                $('.participant-row:last').find('.part-row-del').show()
            id_counter--;
            $('.part-name').unbind('change').bind('change',on_participants_change)
            calc_bill()
        }
      $('#name').change(function(){
        $('.participant-row:first').find('input').val($(this).val())
      })

      $('.accordion-hdr').click(function(e){
          var people = $('#event-participants').find('input')
          var that = this;
          var checked_rows = $(this).next('.panel').find('.row-selected')
          if(checked_rows.length == 0){
          $(this).next('.panel').empty()
          events_cnt = 0
          people.each(function(){
              var val = $(this).val()
              if(val != '' && !$(this).hasClass('hidden-count')){
                var new_chk = $('<div class="accord-row"><span class="check-span">'+
                '<input type="checkbox"  class="event" value="1" name="" hidden>'+
                '</span> <span class="name-span"></span><br></div>')
                $(new_chk).find('.name-span').html(val)
                $(new_chk).find('input').attr('name',$(that).find('.accord-info').attr('data-modal'))
                $(new_chk).find('input').attr('value','p'+$(this).attr('id'))
                //$(new_chk).find('input').unbind('change').bind('change', calc_bill)
                calc_bill()
                $(new_chk).bind('click',accord_click)
                $(that).next('.panel').append($(new_chk))
              }
            })
          }else{
            e.stopPropagation();
            e.preventDefault();
          }
          $(this).addClass('data-rendered');
      })
      function on_participants_change(){
        $('.accordion-hdr').next('.panel').empty()
        $('.accord-row').parents().find('.accordion-hdr').click()
        //$('.accord-row').parents().find('.accordion-hdr').click()
        events_cnt = 0;
        calc_bill()
        
      }
      $('.form-btn').click(function(){
        var entry_cnt = $('#event-participants').find('input').length-1;
        $('#hidden-count').val(entry_cnt)
      })

      // Updates the billing info
      function calc_bill(){
        var entry_input = $('#event-participants').find('input');
        entry_cnt = 0;
        events_cnt = $('.accord-row.row-selected').length;
        entry_input.each(function(){
          if($(this).val()!=""){
            entry_cnt++;
          }
        })
        $('.event-cnt').empty().html(events_cnt)
        var eventSubBill = 49 * events_cnt;
        $('.event-sub-bill').empty().html(eventSubBill)
        $('.entry-cnt').html(entry_cnt)
        var entrySubBill = 99*entry_cnt
        $('.entry-sub-bill').empty().html(entrySubBill)
        var total = entrySubBill+eventSubBill
        $('.total-bill').empty().html(total)
        $('#soft-signal').val(total)

      }
      
      function update_bill(el){
        if($(el).find('.check-span').find('input')[0].checked || this.checked == true){
          events_cnt++
        }else{
          events_cnt--
        }
        calc_bill() 
      }

      
    });