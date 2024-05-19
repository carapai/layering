select tei.uid,
	pi.enrollmentdate,
	pi.enddate,
	jsonb_object_agg(tea.uid, teiv.value) as attributes
from trackedentityattributevalue teiv
inner join trackedentityattribute tea using(trackedentityattributeid)
inner join trackedentityinstance tei using(trackedentityinstanceid)
inner join programinstance pi using(trackedentityinstanceid)
group by tei.uid,
	pi.enrollmentdate,
	pi.enddate;