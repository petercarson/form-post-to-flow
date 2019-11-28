console.log("connected");
function submitFlowDemoForm() {
    $("div.FlowDemo").hide();
    $("div.loading").show();
    var url = "https://prod-19.centralus.logic.azure.com:443/workflows/63aab331d9574236afe1ff674a91d312/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=VMpiU0KaW3W1MZBg6czXZX7NG-TQx0-ZaDoOgXoIenI";
    var item = {
        "__metadata": {
        },
    };
    var termsChecked = $("input#AcceptTerms").prop("checked");
    var terms = $("input#AcceptTerms");
    if (termsChecked == true) {
        terms.attr("value", "Yes");
    } else {
        terms.attr("value", "No");
    }
    var mailingChecked = $("input#MailingList").prop("checked");
    var mailing = $("input#MailingList");
    if (mailingChecked == true) {
        mailing.attr("value", "Yes");
    } else {
        mailing.attr("value", "No");
    }
    item["EventName"] = $("#EventName").val();
    item["Status"] = $("#Status").val();
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