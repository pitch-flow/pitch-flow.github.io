var sample_ids = [1,2,3,4,5,6,7];
var cloning_table_html;
sample_ids.forEach(function(id){
	cloning_table_html += '\
		<tr>\
			<td style="width: 20px">' + id + '</td> \
		    <td><audio controls=""><source src="resources/audio/speaker_scoring/' + id + '_prompt.wav"></audio></td> \
		    <td><audio controls=""><source src="resources/audio/speaker_scoring/' + id + '_yourtts.wav"></audio></td> \
		    <td><audio controls=""><source src="resources/audio/speaker_scoring/' + id + '_valle.wav"></audio></td> \
		    <td><audio controls=""><source src="resources/audio/speaker_scoring/' + id + '_pitchflow_32x1.wav"></audio></td> \
		    <td><audio controls=""><source src="resources/audio/speaker_scoring/' + id + '_pitchflow_32x8.wav"></audio></td> \
	    </tr>';
});
$('.speaker_scoring_audios').html(cloning_table_html);

/*Dropdown Menu*/
$('.dropdown').click(function () {
    $(this).attr('tabindex', 1).focus();
    $(this).toggleClass('active');
    $(this).find('.dropdown-menu').slideToggle(300);
});
$('.dropdown').focusout(function () {
    $(this).removeClass('active');
    $(this).find('.dropdown-menu').slideUp(300);
});
$('.dropdown .dropdown-menu li').click(function () {
    $(this).parents('.dropdown').find('span').text($(this).text());
    $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
});

var spk_sent_map = {
	'p227': 1,
    'p232': 3,
    'p236': 1,
    'p240': 1,
    'p247': 2,
    'p246': 1
}
var source = ['0015_surprise', '0016_sad', '0016_surprise', '0018_angry', '0019_neutral']

$('.dropdown-menu.conversion li').click(function () {
	var target_spk = $(this).parents('.dropdown').find('input').val();
	var vcpairhtml = ' \
		<table class="wrapper smaller_audio"> \
			<tbody style="margin-right: auto; text-align: center;"> \
				<tr> \
					<td><b>Target voice<b></td> \
					<td><audio controls=""><source src="resources/audio/pitch_guidance/' + spk_sent_map[target_spk] + '_' + target_spk + '_prompt_gt.wav"></audio></td> \
					<td></td> \
					<td></td> \
				</tr> \
				<tr> \
					<td><br></td> \
				</tr> \
				<tr> \
					<td></td> \
					<td><b>Source</b></td>\
					<td><b>PitchFlow</b></td> \
					<td><b>PitchFlow + SV</b></td> \
					<td><b>YourTTS</b></td> \
	                <td><b>BNE-PPGVC</b></td> \
				</tr>'
	source.forEach(function(s){
		vcpairhtml += '\
			<tr> \
				<td>' + s + '</td> \
				<td><audio controls=""><source src="resources/audio/pitch_guidance/' + spk_sent_map[target_spk] + '_' + s + '_source_gt.wav"></audio></td> \
				<td><audio controls=""><source src="resources/audio/pitch_guidance/' + spk_sent_map[target_spk] + '_' + s + '_to_' + target_spk + '_pitchflow.wav"></audio></td> \
				<td><audio controls=""><source src="resources/audio/pitch_guidance/' + spk_sent_map[target_spk] + '_' + s + '_to_' + target_spk + '_pitchflow_sv4.wav"></audio></td> \
				<td><audio controls=""><source src="resources/audio/pitch_guidance/' + spk_sent_map[target_spk] + '_' + s + '_to_' + target_spk + '_yourtts.wav"></audio></td> \
				<td><audio controls=""><source src="resources/audio/pitch_guidance/' + spk_sent_map[target_spk] + '_' + s + '_to_' + target_spk + '_bneppgvc.wav"></audio></td> \
			</tr>'
		});

	vcpairhtml += '<tr><td><br></td></tr> \
				   </tbody></table>';
	$('.vcpair').html(vcpairhtml + '</div>');
});

var dropdown_initial = '<table class="wrapper smaller_audio"> <tbody> \
 	<tr> \
    	<td><b>Target voice</b></td> \
    	<td><audio controls=""><source src="resources/audio/pitch_guidance/1_p227_prompt_gt.wav"></audio></td> \
    	<td></td> \
    	<td></td> \
    </tr> \
    <tr> \
        <td><br></td> \
    </tr> \
    <tr> \
    	<td></td> \
        <td><b>Source</b></td> \
        <td><b>PitchFlow</b></td> \
        <td><b>PitchFlow SV4</b></td> \
        <td><b>YourTTS</b></td> \
        <td><b>BNE-PPGVC</b></td> \
    </tr>';
source.forEach(function(s){
		dropdown_initial += '\
			<tr>\
				<td>' + s + '</td> \
				<td><audio controls=""><source src="resources/audio/pitch_guidance/1_' + s + '_source_gt.wav"></audio></td> \
				<td><audio controls=""><source src="resources/audio/pitch_guidance/1_' + s + '_to_p227_pitchflow.wav"></audio></td> \
				<td><audio controls=""><source src="resources/audio/pitch_guidance/1_' + s + '_to_p227_pitchflow_sv4.wav"></audio></td> \
				<td><audio controls=""><source src="resources/audio/pitch_guidance/1_' + s + '_to_p227_yourtts.wav"></audio></td> \
				<td><audio controls=""><source src="resources/audio/pitch_guidance/1_' + s + '_to_p227_bneppgvc.wav"></audio></td> \
			</tr>'
});
dropdown_initial += '</tbody></table>'
$('.pitch_control_replace').replaceWith(dropdown_initial);
