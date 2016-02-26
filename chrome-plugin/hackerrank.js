//Helper function to get click_functions
function click_hackerrank(event)
{
    var u_name = $('#profile-menu .mmR').text() || 'No User';
    var prob_name = $('title')[0].text.split(':')[0].trim();
    var prob_url = url;
    var language = $(event.target).attr('data-extension');

    console.log("Opening " + language + " IDE");

    //Sending Message to the native host with a json object of problem details
    chrome.runtime.sendMessage({problem_name: prob_name, problem_url: prob_url, user_name: u_name, lang : language});
}

// Helper function to add codechef buttons
var hackerrank_interval = null;
function add_hackerrank_buttons()
{
    if ($('.challenge-header h2').text().trim().length === 0)
    {
        // This means that the page hasn't loaded completely yet. So Wait
        return;
    }
    else
    {

        var code_now_button = $('<li>').attr('style', 'position: relative; float: right; margin-right: 10px')
            .append($('<button>').attr('class', 'btn btn-primary bb-submit ans-submit dropdown-toggle')
                            .attr('data-toggle', 'dropdown')
                            .append("Code Now &nbsp;")
                            .append($('<i>').attr('class', 'icon-down-open')))
            .append($('<ul>').attr('class', 'dropdown-menu dropdown-list')
                            .attr('style', 'position: absolute; list-style: none; width: 123px;')
                            .on('click', 'li a', click_hackerrank));

        $.each(languages, function(index, language) {

            $(code_now_button).find('ul')
                .append("<li><a style='margin: 0' data-extension='"+ language.ext +"' id='code_now_id_" + language.ext + "_button'>" + language.name + "</a></li>");
        });

        $('.challenge-header .nav-tabs').append(code_now_button);

        console.log("Code Now Button Added !! ~ Code Now Extension");

        // Clear interval, so that buttons are not added repeatedly
        clearInterval(hackerrank_interval);
    }
}

hackerrank_interval = setInterval(add_hackerrank_buttons, 1000);
