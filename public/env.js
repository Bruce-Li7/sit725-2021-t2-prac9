// const commitButton=()=>{
//     let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
// width=600,height=300,left=100,top=100`;

// open('commit.html','', params);
// };

const uploadProject=(project)=>{
    $.ajax({
      url: '/api/projects',
      contentType: 'application/json',
      data: JSON.stringify(project),
      type: 'POST',
      success: function(result){
        alert('Project successfully uploaded')
      }
    })
  }
  

const newProjectsUploding = () => {
    let title = $('#title').val();
    let image = $('#image').val();
    let video = $('#video').val();
    let description = $('#description').val();

    let project = {title, image, video, description};
    console.log("Form Data Submitted: ", project);
    uploadProject(project);
}

const requestProjectsUploading = () => {
    $.get('/api/projects', (projects) => {
        if (projects.length > 0) {
            console.log(projects);
            listProjects(projects);
        }
    });
};

listProjects = (projects) => {
    projects.forEach(project => {
        console.log(project);
        let item = '<div class="col s6 center-align">' +
            '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + project.image + '">' +
            '</div><div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' + project.title + '<i class="material-icons right">more_vert</i></span><p><a href="' + project.video + '">Video</a></p></div>' +
            '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + project.title + '<i class="material-icons right">close</i></span>' +
            '<p class="card-text">' + project.description + '</p>' +
            '</div></div></div>'
        $("#ListProjects").append(item);
    })
}


$(document).ready(function () {
    requestProjectsUploading();
    console.log('Ready');
    // $('.materialboxed').materialbox();
    // $('#submitForm').click(()=>{
    //     submitForm();
    // })
    $('select').formSelect();
    $('.modal').modal();
    // submitForm();
    // listProjects();
});