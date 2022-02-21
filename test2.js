function welcome ()
{
    document.getElementById("welcome").hidden = true;
    document.getElementById("awesome").hidden = false;
}

function awesome ()
{
    document.getElementById("welcome").hidden = false;
    document.getElementById("awesome").hidden = true;
}