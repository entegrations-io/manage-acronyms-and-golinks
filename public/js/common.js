var docReady = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}
docReady(() => { 
    //Initialize search functionality
    const searchCriteriaField = document.getElementById('searchCriteriaField');
    if (searchCriteriaField) {
        searchCriteriaField.addEventListener('keyup', function (e) {
            const searchText = searchCriteriaField.value.toLowerCase();
            document.querySelectorAll('tr.oneRow').forEach(oneRow => { 
                if (oneRow.textContent.toLowerCase().indexOf(searchText) !=-1) {
                oneRow.style.display = "";
                } else {
                oneRow.style.display = "none";
                }
            });
        });
    }
});
