const paths = {
  homePath() {
    return '/auth';
  },
  topicShowPath(topicSlug: string) {
    return `/auth/topics/${topicSlug}`;
  },
  postCreatePath(topicSlug: string) {
    return `/auth/topics/${topicSlug}/posts/new`;
  },
  postShowPath(topicSlug: string, postId: string) {
    return `/auth/topics/${topicSlug}/posts/${postId}`;
  },
}

export default paths;