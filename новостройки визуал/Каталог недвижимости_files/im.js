document.addEventListener('DOMContentLoaded', () => {

    $('.support-all-cnt, .support-theme-cnt, .chats-all-cnt, .chats-dialog-cnt').css('display', 'none');

    function supportCounter() {
        var $cnt = 0;

        var request = BX.ajax.runComponentAction('bitrix:support.chat', 'allNew', {
            mode: 'class',
            data: {}
        });
        request.catch(function (response) {
            console.error(response);
        });
        request.then(function (response) {
            console.log(response.data);

            if(response.data.STATUS == 'ISSET') {
                $cnt = 0

                $.each(response.data.MES, function(inf, valf){
                    $cnt += valf;

                    if(valf) {
                        $('.support-theme-' + inf).css('display', 'flex');
                        $('.support-theme-' + inf).text(valf);
                    }
                });

                $('.support-all-cnt').css('display', 'flex');
                $('.support-all-cnt').text($cnt);
            } else {
                $('.support-all-cnt, .support-theme-cnt').css('display', 'none');
            }

            if(response.data.CHATS == 'ISSET') {
                $cnt = 0

                $.each(response.data.CMES, function(inf, valf){
                    $cnt += valf;

                    if(valf) {
                        $('.chats-dialog-' + inf).css('display', 'flex');
                        $('.chats-dialog-' + inf).text(valf);
                    }
                });

                $('.chats-all-cnt').css('display', 'flex');
                $('.chats-all-cnt').text($cnt);
            } else {
                $('.chats-all-cnt, .chats-dialog-cnt').css('display', 'none');
            }
        });
    }
    supportCounter();

    setInterval(supportCounter, 10000);
});