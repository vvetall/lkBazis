$(document).ready(function(){

    $(document).on('click', '.load_more', function(){

        var targetContainer = $('.news-list'),          //  Контейнер, в котором хранятся элементы
            url =  $('.load_more').attr('data-url'),    //  URL, из которого будем брать элементы
            url_next =  $('.load_more').attr('data-url2');
            targetContainerBtn = $('#show_more_btn');

        if (url !== undefined) {
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'html',
                success: function(data){

                    //  Удаляем старую навигацию
                    $('.load_more').remove();

                    var elements = $(data).find('.news-item'),  //  Ищем элементы
                        pagination = $(data).find('.load_more');//  Ищем навигацию

                    if (pagination.attr('data-url') != undefined) {
                            $.ajax({
                                type: 'GET',
                                url: url_next,
                                dataType: 'html',
                                success: function (data2) {

                                    pagination.text('Показать еще ' + $(data2).find('.news-item').length);
                                }
                            })
                    }

                    if ($('.nav_page_btn').last().hasClass('span_btn') === false) {
                        $('.nav_page_btn').last().remove();

                        // console.log($('.nav_page_btn').last().hasClass('span_btn'));

                        if ($('.nav_page_btn').last().hasClass('span_btn') === true) {
                            var styles = {
                                backgroundColor : "#2e2e2e",
                                color: "white"
                            };

                            $('.pagination__next').removeAttr('href').css(styles);
                        }
                    }

                    targetContainer.append(elements);   //  Добавляем посты в конец контейнера
                    targetContainerBtn.prepend(pagination); //  добавляем навигацию следом

                }
            })
        }

    });
});