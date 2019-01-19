import PropTypes from "prop-types";

export type Core={
    core_serial: string;
    flight: number;
    block?: any;
    gridfins: boolean;
    legs: boolean;
    reused: boolean;
    land_success?: any;
    landing_intent: boolean;
    landing_type?: any;
    landing_vehicle?: any;
}

type FirstStage={
    cores: Core[];
}

type OrbitParams={
    reference_system: string;
    regime: string;
    longitude?: any;
    semi_major_axis_km?: any;
    eccentricity?: any;
    periapsis_km: number;
    apoapsis_km: number;
    inclination_deg: number;
    period_min?: any;
    lifespan_years?: any;
    epoch?: any;
    mean_motion?: any;
    raan?: any;
    arg_of_pericenter?: any;
    mean_anomaly?: any;
}

export type Payload={
    payload_id: string;
    norad_id: any[];
    reused: boolean;
    customers: string[];
    nationality: string;
    manufacturer: string;
    payload_type: string;
    payload_mass_kg: number;
    payload_mass_lbs: number;
    orbit: string;
    orbit_params: OrbitParams;
}

type SecondStage={
    block: number;
    payloads: Payload[];
}

type Fairings={
    reused: boolean;
    recovery_attempt: boolean;
    recovered: boolean;
    ship?: any;
}

type Rocket={
    rocket_id: string;
    rocket_name: string;
    rocket_type: string;
    first_stage: FirstStage;
    second_stage: SecondStage;
    fairings: Fairings;
}

type Telemetry={
    flight_club?: any;
}

type LaunchSite={
    site_id: string;
    site_name: string;
    site_name_long: string;
}

type LaunchFailureDetails={
    time: number;
    altitude?: any;
    reason: string;
}

type Links={
    mission_patch: string;
    mission_patch_small: string;
    article_link: string;
    wikipedia: string;
    video_link: string;
    flickr_images: any[];
}

export type LaunchItem={
    flight_number: number;
    mission_name: string;
    mission_id: any[];
    upcoming: boolean;
    launch_year: string;
    launch_date_unix: number;
    launch_date_utc: Date;
    launch_date_local: Date;
    is_tentative: boolean;
    tentative_max_precision: string;
    tbd: boolean;
    launch_window: number;
    rocket: Rocket;
    ships: any[];
    telemetry: Telemetry;
    launch_site: LaunchSite;
    launch_success: boolean;
    launch_failure_details: LaunchFailureDetails;
    links: Links;
    details: string;
    static_fire_date_utc: Date;
    static_fire_date_unix: number;
}
const EventType=PropTypes.oneOf(['Upcoming','Past','All','Saved']).isRequired;
export type LaunchItemProps = {item: LaunchItem,SavedEvents:PropTypes.array<number>,saveEvent:(flight_number:Number)=>void,unsaveEvent:(flight_number:Number)=>void};
export type SplashProps = {AllEvents:PropTypes.array<LaunchItem>,initFetch:PropTypes.func.isRequired,rehydrate:PropTypes.bool,
    InitSuccess:PropTypes.bool,InitError:PropTypes.bool};
export type HomeProps = {RefreshError:PropTypes.bool,refreshFetch:()=>void};
export type LaunchListProps = {AllEvents:PropTypes.array<LaunchItem>,
    PastEvents:PropTypes.array<LaunchItem>,UpcomingEvents:PropTypes.array<LaunchItem>,
    SavedEvents:PropTypes.array<number>,
    SearchEvents:PropTypes.array<LaunchItem>,
    Events:EventType,
    Refreshing:PropTypes.bool,RefreshError:PropTypes.bool,RefreshSuccess:PropTypes.bool,
    refreshFetch:()=>void};
export type SearchBarProps = {search:()=>void,home:PropTypes.bool,Search:(keyword:String)=>void};
export type SearchProps = {emptySearch:()=>void};
export type DetailsProps ={AllEvents:PropTypes.array<LaunchItem>,saveEvent:()=>void,unsaveEvent:()=>void,SavedEvents:PropTypes.array<LaunchItem>};

