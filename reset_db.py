import os
 
exclude = ["venv"] # 需要排除的文件目录
for root, dirs, files in os.walk('./label_studio'):
    dirs[:] = [d for d in set(dirs) - set(exclude)]
    if 'migrations' in dirs:
        dir = dirs[dirs.index('migrations')]
        for root_a, dirs_a, files_a in os.walk(os.path.join(root, dir)):
            for file_b in files_a:
                if file_b != '__init__.py':
                    dst_file = os.path.join(root_a, file_b)
                    print('删除文件>>> ', dst_file)
                    os.remove(dst_file)