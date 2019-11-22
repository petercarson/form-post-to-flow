console.log("connected");

function getParamValuesByName(querystring) {
    var qstring = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < qstring.length; i++) {
        var urlparam = qstring[i].split('=');
        if (urlparam[0] == querystring) {
            return urlparam[1];
        }
    }
}

function submitFlowDemoForm() {
    $("form.FlowDemo").hide();
    $("div.loading").show();
    if (location.hostname == "htmldev.envisionit.com") {
        var url = "https://prod-25.westus.logic.azure.com:443/workflows/3fa88ac8a6b948d0a79d092e2be01257/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7ufkNGWxMxbDJG2ukoXrRmlmpbuGql8yKI87D8yAsjs";
    }
    var item = {
        "__metadata": {
        },
    };
    item["EventName"] = $("#EventName").val();
    item["FirstName"] = $("#FirstName").val();
    item["LastName"] = $("#LastName").val();
    item["Email"] = $("#Email").val();
    item["Phone"] = $("#Phone").val();
    item["JobTitle"] = $("#JobTitle").val();
    item["Organization"] = $("#Organization").val();
    item["StreetAddress"] = $("#StreetAddress").val();
    item["City"] = $("#City").val();
    item["AcceptTerms"] = $("#AcceptTerms").val();
    item["MailingList"] = $("#MailingList").val();
    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json;odata=verbose; charset=utf-8",
        data: JSON.stringify(item),
        crossDomain: true,
        success: function (data) {
            $("div.loading").hide();
            $("div.alert").addClass("alert-success");
            $("div.alert").text("You have successfully registered for our webinar! You will be added to the SharePoint list and receive a confirmation email.");
            $("div.alert").show();
        },
        error: function (err) {
            console.log(err);
            $("div.loading").hide();
            $("div.alert").addClass("alert-danger");
            $("div.alert").text("An unexpected error has occurred. Please refresh and try again.");
            $("div.alert").show();
        }
    });
}