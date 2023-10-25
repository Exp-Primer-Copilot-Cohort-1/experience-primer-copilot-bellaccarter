function skillsMember(){
    return {
        name: 'skillsMember',
        restrict: 'E',
        replace: true,
        templateUrl: 'views/directives/skills-member.html',
        scope: {
            member: '='
        }
    };
}