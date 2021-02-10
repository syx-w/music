import tools from '@/utils/tools'

/**
 * 图片上传
 * @param {file} file el-upload文件对象
 * @param {number} size 限制的文件大小(kb) 默认10M
 */
export const validImgUpload = (file, size) => {
  size = +size || 10240
  const isSizeOut = file.size / 1024 > size
  if (isSizeOut) {
    Message.error('上传图片大小不能超过' + tools.toStorage(size * 1024))
  }
  return !isSizeOut
}