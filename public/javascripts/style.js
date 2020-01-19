
// function showResults() {
//   var x = document.getElementById("search")
//   x.value = x.value.toUpperCase()
//   console.log(x.value)
// }

// CODE FOR THE SEARCH RESULTS XHR
// var showResults = debounce(function (arg) {
//   console.log(arg.value)
//   var value = arg.trim()
//   if (value == "" || value.length <= 0) {
//     document.querySelector('#search-results').fadeOut()
//     return
//   } else {
//     document.querySelector('#search-results').fadeIn()
//   }
//   var jqxhr = $.get('/users/details?q=' + value, function (data) {   
//     document.querySelector('#search-results').html("")
//   })
//   console.log(jqxhr)
//     .done(function (data) {
//       if (data.length === 0) {
//         document.querySelector('#search-results').append('<p class="lead text-center mt-2">No results</p>')
//       } else {
//         console.table(data)
//         document.querySelector('#search-results').append('<p class="text-center m-0 lead">Names</p>')
//         data.forEach(x => {
//           document.querySelector('#search-results').append('<a href="#"><p class="m-2 mt-0 lead">' + x.name + '</p> </a>')
//         })
//       }
//     })
//     .fail(function (err) {
//       console.log(err)
//     })
// }, 300)

// function debounce (func, wait, immediate) {
//   var timeout

//   return function () {
//     var context = this
//     var args = arguments
//     var later = function () {
//       timeout = null
//       if (!immediate) func.apply(context, args)
//     }

//     var callNow = immediate && !timeout

//     clearTimeout(timeout)

//     timeout = setTimeout(later, wait)

//     if (callNow) func.apply(context, args)
//   }
// }
