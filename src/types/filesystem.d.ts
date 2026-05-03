interface FileSystemHandlePermissionDescriptor {
  mode?: 'read' | 'readwrite'
}

interface FileSystemDirectoryHandle {
  name: string
  kind: 'directory'
  queryPermission(descriptor?: FileSystemHandlePermissionDescriptor): Promise<PermissionState>
  requestPermission(descriptor?: FileSystemHandlePermissionDescriptor): Promise<PermissionState>
  getDirectoryHandle(name: string, options?: { create?: boolean }): Promise<FileSystemDirectoryHandle>
  getFileHandle(name: string, options?: { create?: boolean }): Promise<FileSystemFileHandle>
  removeEntry(name: string, options?: { recursive?: boolean }): Promise<void>
  entries(): AsyncIterableIterator<[string, FileSystemDirectoryHandle | FileSystemFileHandle]>
  [Symbol.asyncIterator](): AsyncIterableIterator<[string, FileSystemDirectoryHandle | FileSystemFileHandle]>
}

interface FileSystemFileHandle {
  name: string
  kind: 'file'
  getFile(): Promise<File>
  createWritable(options?: { keepExistingData?: boolean }): Promise<FileSystemWritableFileStream>
}

interface FileSystemWritableFileStream extends WritableStream {
  write(data: string | Blob | ArrayBuffer | ArrayBufferView): Promise<void>
  seek(position: number): Promise<void>
  truncate(size: number): Promise<void>
}

interface Window {
  showDirectoryPicker(options?: {
    mode?: 'read' | 'readwrite'
  }): Promise<FileSystemDirectoryHandle>
  electronAPI?: ElectronAPI
}

interface ElectronAPI {
  vault: {
    getPath: () => Promise<string | null>
    getName: () => Promise<string | null>
    select: () => Promise<{ path: string; name: string } | null>
  }
  file: {
    read: (relativePath: string) => Promise<string | null>
    write: (relativePath: string, content: string) => Promise<void>
    delete: (relativePath: string) => Promise<void>
    list: () => Promise<{ path: string; name: string; content: string }[]>
    export: (relativePath: string, content: string) => Promise<void>
  }
  dir: {
    list: () => Promise<string[]>
    create: (relativePath: string) => Promise<void>
    delete: (relativePath: string) => Promise<void>
  }
}
