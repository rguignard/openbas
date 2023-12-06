/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Article {
  article_author?: string;
  /** @format int32 */
  article_comments?: number;
  article_content?: string;
  /** @format date-time */
  article_created_at?: string;
  article_documents?: Document[];
  article_exercise?: Exercise;
  article_id?: string;
  article_is_scheduled?: boolean;
  /** @format int32 */
  article_likes?: number;
  article_media?: Media;
  article_name?: string;
  /** @format int32 */
  article_shares?: number;
  /** @format date-time */
  article_updated_at?: string;
  /** @format date-time */
  article_virtual_publication?: string;
  updateAttributes?: object;
}

export interface ArticleCreateInput {
  article_author?: string;
  /** @format int32 */
  article_comments?: number;
  article_content?: string;
  article_documents?: string[];
  /** @format int32 */
  article_likes?: number;
  article_media: string;
  article_name: string;
  article_published?: boolean;
  /** @format int32 */
  article_shares?: number;
}

export interface ArticleUpdateInput {
  article_author?: string;
  /** @format int32 */
  article_comments?: number;
  article_content?: string;
  article_documents?: string[];
  /** @format int32 */
  article_likes?: number;
  article_media: string;
  article_name: string;
  article_published?: boolean;
  /** @format int32 */
  article_shares?: number;
}

export interface Audience {
  audience_communications?: Communication[];
  /** @format date-time */
  audience_created_at?: string;
  audience_description?: string;
  audience_enabled?: boolean;
  audience_exercise?: Exercise;
  audience_id?: string;
  audience_inject_expectations?: InjectExpectation[];
  audience_injects?: Inject[];
  /** @format int64 */
  audience_injects_expectations_number?: number;
  /** @format int64 */
  audience_injects_expectations_total_expected_score?: number;
  /** @format int64 */
  audience_injects_expectations_total_score?: number;
  /** @format int64 */
  audience_injects_number?: number;
  audience_name?: string;
  audience_tags?: Tag[];
  /** @format date-time */
  audience_updated_at?: string;
  audience_users?: User[];
  /** @format int64 */
  audience_users_number?: number;
  updateAttributes?: object;
}

export interface AudienceCreateInput {
  audience_description?: string;
  audience_name: string;
  audience_tags?: string[];
}

export interface AudienceUpdateActivationInput {
  audience_enabled?: boolean;
}

export interface AudienceUpdateInput {
  audience_description?: string;
  audience_name: string;
  audience_tags?: string[];
}

export interface Challenge {
  challenge_category?: string;
  challenge_content?: string;
  /** @format date-time */
  challenge_created_at?: string;
  challenge_documents?: Document[];
  challenge_exercises?: string[];
  challenge_flags?: ChallengeFlag[];
  challenge_id?: string;
  /** @format int32 */
  challenge_max_attempts?: number;
  challenge_name?: string;
  /** @format int32 */
  challenge_score?: number;
  challenge_tags?: Tag[];
  /** @format date-time */
  challenge_updated_at?: string;
  /** @format date-time */
  challenge_virtual_publication?: string;
  updateAttributes?: object;
}

export interface ChallengeCreateInput {
  challenge_category?: string;
  challenge_content?: string;
  challenge_documents?: string[];
  challenge_flags: FlagInput[];
  /** @format int32 */
  challenge_max_attempts?: number;
  challenge_name: string;
  /** @format int32 */
  challenge_score?: number;
  challenge_tags?: string[];
}

export interface ChallengeFlag {
  flag_challenge?: Challenge;
  /** @format date-time */
  flag_created_at?: string;
  flag_id?: string;
  flag_type?: "VALUE" | "VALUE_CASE" | "REGEXP";
  /** @format date-time */
  flag_updated_at?: string;
  flag_value?: string;
  updateAttributes?: object;
}

export interface ChallengeInformation {
  challenge_detail?: PublicChallenge;
  challenge_expectation?: InjectExpectation;
}

export interface ChallengeResult {
  result?: boolean;
}

export interface ChallengeTryInput {
  challenge_value?: string;
}

export interface ChallengeUpdateInput {
  challenge_category?: string;
  challenge_content?: string;
  challenge_documents?: string[];
  challenge_flags: FlagInput[];
  /** @format int32 */
  challenge_max_attempts?: number;
  challenge_name: string;
  /** @format int32 */
  challenge_score?: number;
  challenge_tags?: string[];
}

export interface ChallengesReader {
  exercise_challenges?: ChallengeInformation[];
  exercise_id?: string;
  exercise_information?: PublicExercise;
}

export interface ChangePasswordInput {
  password: string;
  password_validation: string;
}

export interface Comcheck {
  /** @format date-time */
  comcheck_end_date?: string;
  comcheck_exercise?: Exercise;
  comcheck_id?: string;
  comcheck_message?: string;
  comcheck_name?: string;
  /** @format date-time */
  comcheck_start_date?: string;
  comcheck_state?: "RUNNING" | "EXPIRED" | "FINISHED";
  comcheck_statuses?: ComcheckStatus[];
  comcheck_subject?: string;
  /** @format int64 */
  comcheck_users_number?: number;
  updateAttributes?: object;
}

export interface ComcheckInput {
  comcheck_audiences?: string[];
  /** @format date-time */
  comcheck_end_date?: string;
  comcheck_message?: string;
  comcheck_name: string;
  comcheck_subject?: string;
}

export interface ComcheckStatus {
  comcheckstatus_comcheck?: Comcheck;
  comcheckstatus_id?: string;
  /** @format date-time */
  comcheckstatus_receive_date?: string;
  /** @format date-time */
  comcheckstatus_sent_date?: string;
  /** @format int32 */
  comcheckstatus_sent_retry?: number;
  comcheckstatus_state?: "RUNNING" | "SUCCESS" | "FAILURE";
  comcheckstatus_user?: User;
  updateAttributes?: object;
}

export interface Communication {
  communication_ack?: boolean;
  communication_animation?: boolean;
  communication_attachments?: string[];
  communication_content?: string;
  communication_content_html?: string;
  communication_exercise?: string;
  communication_from?: string;
  communication_id?: string;
  communication_inject?: Inject;
  communication_message_id?: string;
  /** @format date-time */
  communication_received_at?: string;
  /** @format date-time */
  communication_sent_at?: string;
  communication_subject?: string;
  communication_to?: string;
  communication_users?: User[];
  updateAttributes?: object;
}

export interface Contract {
  config: ContractConfig;
  context: Record<string, string>;
  contract_id: string;
  fields: ContractElement[];
  label: Record<string, string>;
  manual: boolean;
  variables: ContractVariable[];
}

export interface ContractConfig {
  color?: string;
  expose?: boolean;
  icon?: string;
  label?: Record<string, string>;
  type?: string;
}

export interface ContractElement {
  expectation?: boolean;
  key?: string;
  label?: string;
  linkedFields?: LinkedFieldModel[];
  linkedValues?: string[];
  mandatory?: boolean;
  type?:
    | "text"
    | "number"
    | "tuple"
    | "checkbox"
    | "textarea"
    | "select"
    | "article"
    | "challenge"
    | "dependency-select"
    | "attachment"
    | "audience";
}

export interface ContractVariable {
  cardinality: "1" | "n";
  children?: ContractVariable[];
  key: string;
  label: string;
  type: "String" | "Object";
}

export interface CreatePlayerInput {
  user_country?: string;
  user_email: string;
  user_firstname?: string;
  user_lastname?: string;
  user_organization?: string;
  user_tags?: string[];
}

export interface CreateUserInput {
  user_admin?: boolean;
  user_email: string;
  user_firstname?: string;
  user_lastname?: string;
  user_organization?: string;
  user_plain_password?: string;
  user_tags?: string[];
}

export interface DirectInjectInput {
  inject_content?: object;
  inject_contract?: string;
  inject_description?: string;
  inject_documents?: InjectDocumentInput[];
  inject_title?: string;
  inject_users?: string[];
}

export interface Document {
  document_description?: string;
  document_exercises?: Exercise[];
  document_id?: string;
  document_name?: string;
  document_tags?: Tag[];
  document_target?: string;
  document_type?: string;
  updateAttributes?: object;
}

export interface DocumentCreateInput {
  document_description?: string;
  document_exercises?: string[];
  document_tags?: string[];
}

export interface DocumentTagUpdateInput {
  tags?: string[];
}

export interface DocumentUpdateInput {
  document_description?: string;
  document_exercises: string[];
  document_tags?: string[];
}

export interface DryInject {
  /** @format date-time */
  dryinject_date?: string;
  dryinject_dryrun?: Dryrun;
  dryinject_exercise?: Exercise;
  dryinject_id?: string;
  dryinject_inject?: Inject;
  dryinject_status?: DryInjectStatus;
  updateAttributes?: object;
}

export interface DryInjectStatus {
  /** @format date-time */
  status_date?: string;
  /** @format int32 */
  status_execution?: number;
  status_id?: string;
  status_name?: "INFO" | "PENDING" | "PARTIAL" | "ERROR" | "SUCCESS";
  status_reporting?: Execution;
  updateAttributes?: object;
}

export interface Dryrun {
  /** @format date-time */
  dryrun_date?: string;
  /** @format date-time */
  dryrun_end_date?: string;
  dryrun_exercise?: Exercise;
  dryrun_finished?: boolean;
  dryrun_id?: string;
  dryrun_name?: string;
  /** @format int32 */
  dryrun_speed?: number;
  /** @format date-time */
  dryrun_start_date?: string;
  dryrun_users?: User[];
  /** @format int64 */
  dryrun_users_number?: number;
  updateAttributes?: object;
}

export interface DryrunCreateInput {
  dryrun_name: string;
  dryrun_users?: string[];
}

export interface Evaluation {
  /** @format date-time */
  evaluation_created_at?: string;
  evaluation_id?: string;
  evaluation_objective?: Objective;
  /** @format int64 */
  evaluation_score?: number;
  /** @format date-time */
  evaluation_updated_at?: string;
  evaluation_user?: User;
  updateAttributes?: object;
}

export interface EvaluationInput {
  /** @format int64 */
  evaluation_score?: number;
}

export interface Execution {
  execution_async_id?: string;
  execution_runtime?: boolean;
  /** @format date-time */
  execution_start?: string;
  /** @format date-time */
  execution_stop?: string;
  /** @format int32 */
  execution_time?: number;
  execution_traces?: ExecutionTrace[];
  status?: "INFO" | "PENDING" | "PARTIAL" | "ERROR" | "SUCCESS";
}

export interface ExecutionTrace {
  trace_identifier?: string;
  trace_message?: string;
  trace_status?: "INFO" | "PENDING" | "PARTIAL" | "ERROR" | "SUCCESS";
  /** @format date-time */
  trace_time?: string;
  trace_users?: string[];
}

export interface Exercise {
  exercise_articles?: Article[];
  /** @format int64 */
  exercise_communications_number?: number;
  /** @format date-time */
  exercise_created_at?: string;
  exercise_description?: string;
  exercise_documents?: Document[];
  /** @format date-time */
  exercise_end_date?: string;
  exercise_id?: string;
  exercise_injects?: Inject[];
  exercise_injects_statistics?: Record<string, number>;
  exercise_lessons_anonymized?: boolean;
  /** @format int64 */
  exercise_lessons_answers_number?: number;
  exercise_lessons_categories?: LessonsCategory[];
  exercise_logo_dark?: Document;
  exercise_logo_light?: Document;
  /** @format int64 */
  exercise_logs_number?: number;
  exercise_mail_from?: string;
  exercise_message_footer?: string;
  exercise_message_header?: string;
  exercise_name: string;
  /** @format date-time */
  exercise_next_inject_date?: string;
  exercise_next_possible_status?: (
    | "SCHEDULED"
    | "CANCELED"
    | "RUNNING"
    | "PAUSED"
    | "FINISHED"
  )[];
  exercise_observers?: User[];
  exercise_pauses?: Pause[];
  exercise_planners?: User[];
  exercise_players?: User[];
  /** @format double */
  exercise_score?: number;
  /** @format date-time */
  exercise_start_date?: string;
  exercise_status?:
    | "SCHEDULED"
    | "CANCELED"
    | "RUNNING"
    | "PAUSED"
    | "FINISHED";
  exercise_subtitle?: string;
  exercise_tags?: Tag[];
  /** @format date-time */
  exercise_updated_at?: string;
  /** @format int64 */
  exercise_users_number?: number;
  updateAttributes?: object;
}

export interface ExerciseCreateInput {
  exercise_description?: string;
  exercise_name: string;
  /** @format date-time */
  exercise_start_date?: string;
  exercise_subtitle?: string;
  exercise_tags?: string[];
}

export interface ExerciseLessonsInput {
  exercise_lessons_anonymized?: boolean;
}

export interface ExerciseSimple {
  exercise_id?: string;
  exercise_name?: string;
  /** @format date-time */
  exercise_start_date?: string;
  exercise_status?:
    | "SCHEDULED"
    | "CANCELED"
    | "RUNNING"
    | "PAUSED"
    | "FINISHED";
  exercise_subtitle?: string;
  exercise_tags?: Tag[];
}

export interface ExerciseUpdateInput {
  exercise_description?: string;
  exercise_mail_from?: string;
  exercise_message_footer?: string;
  exercise_message_header?: string;
  exercise_name: string;
  exercise_subtitle?: string;
}

export interface ExerciseUpdateLogoInput {
  exercise_logo_dark?: string;
  exercise_logo_light?: string;
}

export interface ExerciseUpdateStartDateInput {
  /** @format date-time */
  exercise_start_date?: string;
}

export interface ExerciseUpdateStatusInput {
  exercise_status?:
    | "SCHEDULED"
    | "CANCELED"
    | "RUNNING"
    | "PAUSED"
    | "FINISHED";
}

export interface ExerciseUpdateTagsInput {
  exercise_tags?: string[];
}

export interface ExpectationUpdateInput {
  /** @format int32 */
  expectation_score?: number;
}

export interface FlagInput {
  flag_type: string;
  flag_value: string;
}

export interface Grant {
  grant_exercise?: Exercise;
  grant_group?: Group;
  grant_id?: string;
  grant_name?: "OBSERVER" | "PLANNER";
  updateAttributes?: object;
}

export interface Group {
  group_default_exercise_assign?: ("OBSERVER" | "PLANNER")[];
  group_default_exercise_observer?: boolean;
  group_default_exercise_planner?: boolean;
  group_default_user_assign?: boolean;
  group_description?: string;
  group_grants?: Grant[];
  group_id?: string;
  group_name?: string;
  group_organizations?: Organization[];
  group_users?: User[];
  updateAttributes?: object;
}

export interface GroupCreateInput {
  group_default_exercise_observer?: boolean;
  group_default_exercise_planner?: boolean;
  group_default_user_assign?: boolean;
  group_description?: string;
  group_name: string;
}

export interface GroupGrantInput {
  grant_exercise: string;
  grant_name?: "OBSERVER" | "PLANNER";
}

export interface GroupUpdateUsersInput {
  group_users?: string[];
}

export interface Inject {
  footer?: string;
  header?: string;
  inject_all_audiences?: boolean;
  inject_audiences?: Audience[];
  inject_city?: string;
  inject_communications?: Communication[];
  /** @format int64 */
  inject_communications_not_ack_number?: number;
  /** @format int64 */
  inject_communications_number?: number;
  inject_content?: object;
  inject_contract?: string;
  inject_country?: string;
  /** @format date-time */
  inject_created_at?: string;
  /** @format date-time */
  inject_date?: string;
  /**
   * @format int64
   * @min 0
   */
  inject_depends_duration: number;
  inject_depends_on?: Inject;
  inject_description?: string;
  inject_documents?: InjectDocument[];
  inject_enabled?: boolean;
  inject_exercise?: Exercise;
  inject_expectations?: InjectExpectation[];
  inject_id?: string;
  /** @format date-time */
  inject_sent_at?: string;
  inject_status?: InjectStatus;
  inject_tags?: Tag[];
  inject_title?: string;
  inject_type?: string;
  /** @format date-time */
  inject_updated_at?: string;
  inject_user?: User;
  /** @format int64 */
  inject_users_number?: number;
  updateAttributes?: object;
}

export interface InjectAudiencesInput {
  inject_audiences?: string[];
}

export interface InjectDocument {
  document_attached?: boolean;
  document_id?: Document;
  inject_id?: Inject;
}

export interface InjectDocumentInput {
  document_attached?: boolean;
  document_id?: string;
}

export interface InjectExpectation {
  inject_expectation_article?: Article;
  inject_expectation_audience?: Audience;
  inject_expectation_challenge?: Challenge;
  /** @format date-time */
  inject_expectation_created_at?: string;
  inject_expectation_exercise?: Exercise;
  /** @format int32 */
  inject_expectation_expected_score?: number;
  inject_expectation_inject?: Inject;
  inject_expectation_result?: string;
  /** @format int32 */
  inject_expectation_score?: number;
  inject_expectation_type?:
    | "TEXT"
    | "DOCUMENT"
    | "ARTICLE"
    | "CHALLENGE"
    | "MANUAL";
  /** @format date-time */
  inject_expectation_updated_at?: string;
  inject_expectation_user?: User;
  injectexpectation_id?: string;
  updateAttributes?: object;
}

export interface InjectInput {
  inject_all_audiences?: boolean;
  inject_audiences?: string[];
  inject_city?: string;
  inject_content?: object;
  inject_contract?: string;
  inject_country?: string;
  /** @format int64 */
  inject_depends_duration?: number;
  inject_depends_from_another?: string;
  inject_description?: string;
  inject_documents?: InjectDocumentInput[];
  inject_tags?: string[];
  inject_title?: string;
}

export interface InjectStatus {
  status_async_id?: string;
  /** @format date-time */
  status_date?: string;
  /** @format int32 */
  status_execution?: number;
  status_id?: string;
  status_name?: string;
  status_reporting?: Execution;
  updateAttributes?: object;
}

export interface InjectUpdateActivationInput {
  inject_enabled?: boolean;
}

export interface InjectUpdateStatusInput {
  message?: string;
  status?: string;
}

export interface InjectUpdateTriggerInput {
  /** @format int64 */
  inject_depends_duration?: number;
}

export interface LessonsAnswer {
  /** @format date-time */
  lessons_answer_created_at?: string;
  lessons_answer_exercise?: string;
  lessons_answer_negative?: string;
  lessons_answer_positive?: string;
  lessons_answer_question?: LessonsQuestion;
  /** @format int32 */
  lessons_answer_score?: number;
  /** @format date-time */
  lessons_answer_updated_at?: string;
  lessons_answer_user?: User;
  lessonsanswer_id?: string;
  updateAttributes?: object;
}

export interface LessonsAnswerCreateInput {
  lessons_answer_negative?: string;
  lessons_answer_positive?: string;
  /** @format int32 */
  lessons_answer_score?: number;
}

export interface LessonsCategory {
  lessons_category_audiences?: Audience[];
  /** @format date-time */
  lessons_category_created_at?: string;
  lessons_category_description?: string;
  lessons_category_exercise?: Exercise;
  lessons_category_name?: string;
  /** @format int32 */
  lessons_category_order?: number;
  lessons_category_questions?: LessonsQuestion[];
  /** @format date-time */
  lessons_category_updated_at?: string;
  lessons_category_users?: string[];
  lessonscategory_id?: string;
  updateAttributes?: object;
}

export interface LessonsCategoryAudiencesInput {
  lessons_category_audiences?: string[];
}

export interface LessonsCategoryCreateInput {
  lessons_category_description?: string;
  lessons_category_name: string;
  /** @format int32 */
  lessons_category_order?: number;
}

export interface LessonsCategoryUpdateInput {
  lessons_category_description?: string;
  lessons_category_name: string;
  /** @format int32 */
  lessons_category_order?: number;
}

export interface LessonsQuestion {
  lessons_question_answers?: LessonsAnswer[];
  lessons_question_category?: LessonsCategory;
  lessons_question_content?: string;
  /** @format date-time */
  lessons_question_created_at?: string;
  lessons_question_exercise?: string;
  lessons_question_explanation?: string;
  /** @format int32 */
  lessons_question_order?: number;
  /** @format date-time */
  lessons_question_updated_at?: string;
  lessonsquestion_id?: string;
  updateAttributes?: object;
}

export interface LessonsQuestionCreateInput {
  lessons_question_content: string;
  lessons_question_explanation?: string;
  /** @format int32 */
  lessons_question_order?: number;
}

export interface LessonsQuestionUpdateInput {
  lessons_question_content: string;
  lessons_question_explanation?: string;
  /** @format int32 */
  lessons_question_order?: number;
}

export interface LessonsSendInput {
  body?: string;
  subject?: string;
}

export interface LessonsTemplate {
  /** @format date-time */
  lessons_template_created_at?: string;
  lessons_template_description?: string;
  lessons_template_name?: string;
  /** @format date-time */
  lessons_template_updated_at?: string;
  lessonstemplate_id?: string;
  updateAttributes?: object;
}

export interface LessonsTemplateCategory {
  /** @format date-time */
  lessons_template_category_created_at?: string;
  lessons_template_category_description?: string;
  lessons_template_category_name?: string;
  /** @format int32 */
  lessons_template_category_order?: number;
  lessons_template_category_questions?: LessonsTemplateQuestion[];
  lessons_template_category_template?: LessonsTemplate;
  /** @format date-time */
  lessons_template_category_updated_at?: string;
  lessonstemplatecategory_id?: string;
  updateAttributes?: object;
}

export interface LessonsTemplateCategoryCreateInput {
  lessons_template_category_description?: string;
  lessons_template_category_name: string;
  /** @format int32 */
  lessons_template_category_order?: number;
}

export interface LessonsTemplateCategoryUpdateInput {
  lessons_template_category_description?: string;
  lessons_template_category_name: string;
  /** @format int32 */
  lessons_template_category_order?: number;
}

export interface LessonsTemplateCreateInput {
  lessons_template_description?: string;
  lessons_template_name: string;
}

export interface LessonsTemplateQuestion {
  lessons_template_question_category?: LessonsTemplateCategory;
  lessons_template_question_content?: string;
  /** @format date-time */
  lessons_template_question_created_at?: string;
  lessons_template_question_explanation?: string;
  /** @format int32 */
  lessons_template_question_order?: number;
  /** @format date-time */
  lessons_template_question_updated_at?: string;
  lessonstemplatequestion_id?: string;
  updateAttributes?: object;
}

export interface LessonsTemplateQuestionCreateInput {
  lessons_template_question_content: string;
  lessons_template_question_explanation?: string;
  /** @format int32 */
  lessons_template_question_order?: number;
}

export interface LessonsTemplateQuestionUpdateInput {
  lessons_template_question_content: string;
  lessons_template_question_explanation?: string;
  /** @format int32 */
  lessons_template_question_order?: number;
}

export interface LessonsTemplateUpdateInput {
  lessons_template_description?: string;
  lessons_template_name: string;
}

export interface LinkedFieldModel {
  key?: string;
  type?:
    | "text"
    | "number"
    | "tuple"
    | "checkbox"
    | "textarea"
    | "select"
    | "article"
    | "challenge"
    | "dependency-select"
    | "attachment"
    | "audience";
}

export interface Log {
  log_content?: string;
  /** @format date-time */
  log_created_at?: string;
  log_exercise?: Exercise;
  log_id?: string;
  log_tags?: Tag[];
  log_title?: string;
  /** @format date-time */
  log_updated_at?: string;
  log_user?: User;
  updateAttributes?: object;
}

export interface LogCreateInput {
  log_content?: string;
  log_tags?: string[];
  log_title?: string;
}

export interface LoginUserInput {
  login: string;
  password: string;
}

export interface Media {
  logos?: Document[];
  /** @format date-time */
  media_created_at?: string;
  media_description?: string;
  media_id?: string;
  media_logo_dark?: Document;
  media_logo_light?: Document;
  media_mode?: string;
  media_name?: string;
  media_primary_color_dark?: string;
  media_primary_color_light?: string;
  media_secondary_color_dark?: string;
  media_secondary_color_light?: string;
  media_type?: string;
  /** @format date-time */
  media_updated_at?: string;
  updateAttributes?: object;
}

export interface MediaCreateInput {
  media_description: string;
  media_name: string;
  media_type: string;
}

export interface MediaReader {
  media_articles?: Article[];
  media_exercise?: Exercise;
  media_id?: string;
  media_information?: Media;
}

export interface MediaUpdateInput {
  media_description: string;
  media_mode?: string;
  media_name: string;
  media_primary_color_dark?: string;
  media_primary_color_light?: string;
  media_secondary_color_dark?: string;
  media_secondary_color_light?: string;
  media_type: string;
}

export interface MediaUpdateLogoInput {
  media_logo_dark?: string;
  media_logo_light?: string;
}

export interface Objective {
  /** @format date-time */
  objective_created_at?: string;
  objective_description?: string;
  objective_evaluations?: Evaluation[];
  objective_exercise?: Exercise;
  objective_id?: string;
  /** @format int32 */
  objective_priority?: number;
  /** @format double */
  objective_score?: number;
  objective_title?: string;
  /** @format date-time */
  objective_updated_at?: string;
  updateAttributes?: object;
}

export interface ObjectiveInput {
  objective_description?: string;
  /** @format int32 */
  objective_priority?: number;
  objective_title?: string;
}

export interface Organization {
  /** @format date-time */
  organization_created_at?: string;
  organization_description?: string;
  organization_id?: string;
  organization_injects?: Inject[];
  /** @format int64 */
  organization_injects_number?: number;
  organization_name?: string;
  organization_tags?: Tag[];
  /** @format date-time */
  organization_updated_at?: string;
  updateAttributes?: object;
}

export interface OrganizationCreateInput {
  organization_description?: string;
  organization_name: string;
  organization_tags?: string[];
}

export interface OrganizationGrantInput {
  organization_id: string;
}

export interface OrganizationUpdateInput {
  organization_description?: string;
  organization_name: string;
  organization_tags?: string[];
}

export interface Pause {
  log_id?: string;
  /** @format date-time */
  pause_date?: string;
  /** @format int64 */
  pause_duration?: number;
  pause_exercise?: Exercise;
  updateAttributes?: object;
}

export interface PlatformSetting {
  setting_key?: string;
  setting_value?: object;
}

export interface PlatformStatistic {
  exercises_count?: StatisticElement;
  injects_count?: StatisticElement;
  platform_id?: string;
  users_count?: StatisticElement;
}

export interface PublicChallenge {
  challenge_category?: string;
  challenge_content?: string;
  challenge_documents?: string[];
  challenge_flags?: PublicChallengeFlag[];
  challenge_id?: string;
  /** @format int32 */
  challenge_max_attempts?: number;
  challenge_name?: string;
  /** @format int32 */
  challenge_score?: number;
  challenge_tags?: string[];
  /** @format date-time */
  challenge_virtual_publication?: string;
}

export interface PublicChallengeFlag {
  flag_challenge?: string;
  flag_id?: string;
  flag_type?: "VALUE" | "VALUE_CASE" | "REGEXP";
}

export interface PublicExercise {
  exercise_description?: string;
  exercise_id?: string;
  exercise_name?: string;
}

export interface RenewTokenInput {
  token_id: string;
}

export interface Report {
  /** @format date-time */
  report_created_at?: string;
  report_description?: string;
  report_exercise?: Exercise;
  report_general_information?: boolean;
  report_id?: string;
  report_lessons_details?: boolean;
  report_lessons_objectives?: boolean;
  report_lessons_stats?: boolean;
  report_name?: string;
  report_stats_data?: boolean;
  report_stats_definition?: boolean;
  report_stats_definition_score?: boolean;
  report_stats_results?: boolean;
  /** @format date-time */
  report_updated_at?: string;
  updateAttributes?: object;
}

export interface ReportCreateInput {
  report_description?: string;
  report_general_information?: boolean;
  report_lessons_details?: boolean;
  report_lessons_objectives?: boolean;
  report_lessons_stats?: boolean;
  report_name: string;
  report_stats_data?: boolean;
  report_stats_definition?: boolean;
  report_stats_definition_score?: boolean;
  report_stats_results?: boolean;
}

export interface ReportUpdateInput {
  report_description?: string;
  report_general_information?: boolean;
  report_lessons_details?: boolean;
  report_lessons_objectives?: boolean;
  report_lessons_stats?: boolean;
  report_name: string;
  report_stats_data?: boolean;
  report_stats_definition?: boolean;
  report_stats_definition_score?: boolean;
  report_stats_results?: boolean;
}

export interface ResetUserInput {
  lang?: string;
  login: string;
}

export interface SettingsUpdateInput {
  platform_lang: string;
  platform_name: string;
  platform_theme: string;
}

export interface StatisticElement {
  /** @format int64 */
  global_count?: number;
  /** @format int64 */
  progression_count?: number;
}

export interface Tag {
  tag_color?: string;
  tag_id?: string;
  tag_name?: string;
  tags_documents?: Document[];
  updateAttributes?: object;
}

export interface TagCreateInput {
  tag_color: string;
  tag_name: string;
}

export interface TagUpdateInput {
  tag_color: string;
  tag_name: string;
}

export interface Token {
  /** @format date-time */
  token_created_at?: string;
  token_id?: string;
  token_user?: User;
  token_value?: string;
  updateAttributes?: object;
}

export interface UpdateMePasswordInput {
  user_current_password: string;
  user_plain_password: string;
}

export interface UpdatePlayerInput {
  user_phone2?: string;
  user_country?: string;
  user_email: string;
  user_firstname?: string;
  user_lastname?: string;
  user_organization?: string;
  user_pgp_key?: string;
  /** @pattern ^\+ */
  user_phone?: string;
  user_tags?: string[];
}

export interface UpdateProfileInput {
  user_country?: string;
  user_email?: string;
  user_firstname: string;
  user_lang?: string;
  user_lastname: string;
  user_organization?: string;
  user_theme?: string;
}

export interface UpdateUserInfoInput {
  user_phone2?: string;
  user_pgp_key?: string;
  user_phone?: string;
}

export interface UpdateUserInput {
  user_phone2?: string;
  user_admin?: boolean;
  user_email?: string;
  user_firstname?: string;
  user_lastname?: string;
  user_organization?: string;
  user_pgp_key?: string;
  user_phone?: string;
  user_tags?: string[];
}

export interface UpdateUsersAudienceInput {
  audience_users?: string[];
}

export interface User {
  user_phone2?: string;
  injects?: Inject[];
  updateAttributes?: object;
  user_admin?: boolean;
  user_audiences?: Audience[];
  user_city?: string;
  user_communications?: Communication[];
  user_country?: string;
  /** @format date-time */
  user_created_at?: string;
  user_email: string;
  user_firstname?: string;
  user_gravatar?: string;
  user_groups?: Group[];
  user_id: string;
  user_injects?: Inject[];
  /** @format int64 */
  user_injects_number?: number;
  user_is_external?: boolean;
  user_is_manager?: boolean;
  user_is_observer?: boolean;
  user_is_only_player?: boolean;
  user_is_planner?: boolean;
  user_is_player?: boolean;
  user_lang?: string;
  /** @format date-time */
  user_last_comcheck?: string;
  user_lastname?: string;
  user_organization?: Organization;
  user_pgp_key?: string;
  user_phone?: string;
  /** @format int32 */
  user_status: number;
  user_tags?: Tag[];
  user_theme?: string;
  /** @format date-time */
  user_updated_at?: string;
}

export interface ValidationContent {
  errors?: string[];
}

export interface ValidationError {
  children?: Record<string, ValidationContent>;
}

export interface ValidationErrorBag {
  /** @format int32 */
  code?: number;
  errors?: ValidationError;
  message?: string;
}

export interface Variable {
  updateAttributes?: object;
  /** @format date-time */
  variable_created_at?: string;
  variable_description?: string;
  variable_exercise?: Exercise;
  variable_id: string;
  /** @pattern ^[a-z_]+$ */
  variable_key: string;
  variable_type: "String" | "Object";
  /** @format date-time */
  variable_updated_at?: string;
  variable_value?: string;
}

export interface VariableInput {
  variable_description?: string;
  /** @pattern ^[a-z_]+$ */
  variable_key: string;
  variable_value?: string;
}

export interface ViolationErrorBag {
  error?: string;
  message?: string;
  type?: string;
}
